"use strict";

var fs = require('fs');

// Converts HTML template into function that will populate
// template with data from object passed and argument
// and return HTML string
//
// JavaScript code is delimited like this in the template <% code %>
// Fill-in the blanks are delimited like this <%=obj.prop%> Note no spaces around "="
//

exports.compose = function(tmpStr, data) {
	var fn = _compile(tmpStr);
	return data ? fn(data) : fn;
}


// Express method for app.engine()
exports.renderFile = function(path, options, fn){
  
  if ('function' == typeof options) {
    fn = options, options = {};
  }

  options.filename = path;

  fs.readFile(path, 'utf8', function(err, data) {
  	if (err) {
  		fn(err);
  		return;
  	}
  	fn(null, exports.compose(data, options));
  });
};


function _compile(templateStr, options) {
	var template = templateStr;

	// Generate a reusable function that will serve as a template generator.
	template = "var  _p_=[],_print_=function(){_p_.push.apply(_p_,arguments);}, _fillin_ = function(val){ return typeof val != 'undefined'?val:''}; _p_.push('" +
				template.replace(/[\r\t\n\s]+/g, " ")
						.replace(/'(?=[^%]*%>)/g,"\t")
						.split("'").join("\\'")
						.split("\t").join("'")
						.replace(/<%=(.+?)%>/g, "',_fillin_($1),'")
						.split("<%").join("');")
						.split("%>").join("_p_.push('")
				+ "'); return _p_.join('');";

	return new Function("obj", template);
} 
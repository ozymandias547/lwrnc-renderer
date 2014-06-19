(function(app){
	"use strict";
	// Converts HTML template into function that will populate
	// template with data from object passed and argument
	// and return HTML string
	//
	// JavaScript code is delimited like this in the template <% code %>
	// Fill-in the blanks are delimited like this <%=obj.prop%> Note no spaces around "="
	//
	var mod
	if (!app || !app.addModule)
		mod = window.templateEngine = {};
	else
		mod = app.addModule('templateEngine');
	
	mod.compose = function(tmpStr, data) {
		var fn = compile(tmpStr);
		return data ? fn(data) : fn;
	};
	
	/*** Private method ***/
	function compile(templateStr) {
		var template = templateStr;
		// Generate a reusable function that will serve as a template generator.

		if ( !/\s/.test(template) ) {
			//Got ID not template string
			template = document.getElementById(template);
			
			if (!template)
				return null;
			
			template = template.innerHTML;
		}
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
})(window);

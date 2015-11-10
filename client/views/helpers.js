Template.registerHelper('arredondar', function (f, n){
	if (isNaN(f)) return;
	return parseFloat(f).toFixed(n);
})
Template.registerHelper('divide', function (a, b, n){
	return parseFloat(a/b).toFixed(n)
})

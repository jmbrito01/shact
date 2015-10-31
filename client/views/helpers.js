Template.registerHelper('arredondar', function (f, n){
	if (isNaN(f)) return;
	return parseFloat(f).toFixed(n);
})
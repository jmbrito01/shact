
Template.atInputIntlTel.onRendered(function () {
    this.$('input').intlTelInput(this.data.options.intlTelOptions);
});

Template.atInputIntlTel.onDestroyed(function () {
    this.$('input').intlTelInput('destroy');
});

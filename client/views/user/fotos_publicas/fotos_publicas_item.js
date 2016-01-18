Template.fotosPublicasItem.helpers({
  width: function() {
    return $(window).width();
  },
  height: function() {
    return parseInt($(window).width() * 3 / 4);
  }
})
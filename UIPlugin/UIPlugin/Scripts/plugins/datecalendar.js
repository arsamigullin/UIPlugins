(function ($) {
	$.widget("ui.datecalendar", {
	    _create: function () {
	        debugger;
		    var self = this,
                name = this.name;
			debugger;
			if (this.element.is('input')) {
                // maindiv
			    var maindiv = $('<div class="calendarmaindiv" />');
			    maindiv.insertAfter(this.element);
                // position input element
			    var inputPosition = this.element.position();
                // configure position div based on position input
			    $(".calendarmaindiv").css("top", inputPosition.top + this.element.outerHeight());
			    $(".calendarmaindiv").css("left", inputPosition.left - (maindiv.outerWidth() - this.element.outerWidth()));
                // initially div hidden
			    maindiv.hide();
			    this.element.on('click', function () {
                     maindiv.show();
                 })
			    this.element.on('blur', function () {
                    maindiv.hide();
                });
			} else {
			    throw 'datecalendar widget only works on input elements';
			}
		},

		// Contained in jquery.qs.tagger.js
		destroy: function () {

			// if using jQuery UI 1.8.x
		$.Widget.prototype.destroy.call(this);
			// if using jQuery UI 1.9.x
			//this._destroy();
	}
	});
}(jQuery));
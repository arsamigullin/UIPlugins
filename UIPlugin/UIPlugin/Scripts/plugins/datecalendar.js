(function ($) {
    $.widget("ui.datecalendar", {
        initialyear: 1995,
        initialdayfirstjan:"sat",
        options:
            {
                delimeter: '/',
                dateformat: 'ddmmyyyy'
            },
        _create: function () {
            debugger;
            var self = this;
            var delimeter = self.options.delimeter;
            var dateformat = self.options.dateformat;
            checkValidDateFormat(dateformat);
            checkValidDelimeter(delimeter);
            if (this.element.is('input')) {
                // maindiv
                var maindiv = $('<div class="calendarmaindiv">\
                                <div class="monthyearname">\
                                    <span>Месяц</span>\
                                \</div>\
                                <table class="daysofweek">\
                                <tr>\
                                    <td class="daysofweek">Su</td>\
                                    <td class="daysofweek">Mo</td>\
                                    <td class="daysofweek">Tue</td>\
                                    <td class="daysofweek">Wed</td>\
                                    <td class="daysofweek">Thu</td>\
                                    <td class="daysofweek">Fr</td>\
                                    <td class="daysofweek">Sut</td>\
                                </tr>\
                                <tr>\
                                    <td></td>\
                                    <td></td>\
                                    <td></td>\
                                    <td></td>\
                                    <td></td>\
                                    <td></td>\
                                    <td></td>\
                                </tr>\
                                <tr>\
                                    <td></td>\
                                    <td></td>\
                                    <td></td>\
                                    <td></td>\
                                    <td></td>\
                                    <td></td>\
                                    <td></td>\
                                </tr>\
                                <tr>\
                                    <td></td>\
                                    <td></td>\
                                    <td></td>\
                                    <td></td>\
                                    <td></td>\
                                    <td></td>\
                                    <td></td>\
                                </tr>\
                                <tr>\
                                    <td></td>\
                                    <td></td>\
                                    <td></td>\
                                    <td></td>\
                                    <td></td>\
                                    <td></td>\
                                    <td></td>\
                                </tr>\
                                <tr>\
                                    <td></td>\
                                    <td></td>\
                                    <td></td>\
                                    <td></td>\
                                    <td></td>\
                                    <td></td>\
                                    <td></td>\
                                </tr>\
                                <tr>\
                                    <td></td>\
                                    <td></td>\
                                    <td></td>\
                                    <td></td>\
                                    <td></td>\
                                    <td></td>\
                                    <td></td>\
                                </tr>\
                                </table>\
                            </div>');
                maindiv.insertAfter(this.element);
                // position input element
                var inputPosition = this.element.position();
                // configure position div based on position input
                $(".calendarmaindiv").css("top", inputPosition.top + this.element.outerHeight());
                $(".calendarmaindiv").css("left", inputPosition.left - (maindiv.outerWidth() - this.element.outerWidth()));
                // initially div hidde
                maindiv.hide();
                this.element.on('click', function (event) {
                    maindiv.show();
                    var input = event.target;
                    if (!input.value) {
                        try {
                            Date.parseExact(input.value, [getDateMask(dateformat, delimeter)]);
                        }
                        catch (ex) {
                            debugger;
                            setCurrentDate(self.initialyear);
                        }
                    }
                    else {

                    }
                })
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
    var convertNumMonthToText= function (monthnum)
    {
        switch (monthnum)
        {
            case "01": return "January";
            case "02": return "Febrary";
            case "03": return "March";
            case "04": return "April";
            case "05": return "May";
            case "06": return "June";
            case "07": return "July";
            case "08": return "August";
            case "09": return "September";
            case "10": return "October";
            case "11": return "November";
            case "12": return "December";
            default: throw 'datecalendar: month with number ' + monthnum+ ' does not exists';
        }
    }

    var checkValidDateFormat= function(dateformat)
    {
        if (dateformat.toLowerCase() !== "ddmmyyyy" && dateformat.toLowerCase() !== "mmddyyyy" && dateformat.toLowerCase() !== "yyyymmdd" && dateformat.toLowerCase() !== "yyyyddmm")
        {
            throw 'datecalendar: dateformat ' + dateformat + ' are not supported';
        }

    }

    var checkValidDelimeter = function (delimeter) {
        if (delimeter !== "." && delimeter !== "/" && delimeter !== "|" && delimeter !== ":")
        {
          throw 'datecalendar: delimeter ' + delimeter + ' are not supported';
        }
    }

    var getDateMask = function (dateformat, dlimeter) {
        if (dateformat.toLowerCase() === "ddmmyyyy") {
            return "dd" + dlimeter + "mm" + dlimeter + "yyyy";
        }
        if (dateformat.toLowerCase() === "mmddyyyy") {
            return "mm" + dlimeter + "dd" + dlimeter + "yyyy";
        }
        if (dateformat.toLowerCase() === "yyyymmdd") {
            return "yyyy" + dlimeter + "mm" + dlimeter + "dd";
        }
        if (dateformat.toLowerCase() === "yyyyddmm") {
            return "yyyy" + dlimeter + "dd" + dlimeter + "mm";
        }
    }

    var setCurrentDate = function (initialyear)
    {
        var arraytd = convertTableToArray();
        var today = new Date();
        var curday = today.getDate();
        var curmonth = today.getMonth();
        var curyear = today.getFullYear();
        var difyear = curyear - initialyear;
        // leap year one in 4 year
        var deviding;
        if (difyear < 4 && difyear > 0)
        {
            deviding = 0;
        }

        if ((curyear % 4 == 0 && difyear == 0)) {
            deviding = 0;
        }

        deviding = Math.floor(difyear / 4);
        var daysInDiffer = (difyear - deviding) * 365 + deviding * 366;
        var daysInCurYearUntilMonth = getSumDaysTillMonth(curyear, curmonth);
        var totalDays = daysInDiffer + daysInCurYearUntilMonth;
        var dayofweek = Math.floor(totalDays % 7);
        var i;
        var j = dayofweek;
        var k=0;
        var daysInCurMonth = daysInMonth(curmonth, curyear);
        debugger;
        for (i=1;i<arraytd.length;i++)
        {
            for (; j < arraytd[i].length; j++) {
                k++;
                $(arraytd[i][j]).html(k);
                if (k >= daysInCurMonth) return;
                
            }
            j = 0;
        }
    }

    var convertTableToArray = function ()
    {
        
        var tableArray = [];
        $(".daysofweek tr").each(function (index) {
            if (index==0) return;
            var arrayOfThisRow = [];
            var tableData = $(this).find('td');
            if (tableData.length > 0) {
                tableData.each(function () {
                    debugger;
                    $(this).addClass('numbertd');
                    arrayOfThisRow.push($(this));
                });
                tableArray.push(arrayOfThisRow);
            }
        });

        return tableArray;
    }

    function daysInMonth(month, year) {
        return new Date(year, month, 0).getDate();
    }

    var getSumDaysTillMonth = function (year, tillmonth) {
        var totalday = 0;
        var month;
        for (month = 0; month < tillmonth; month++) {
            totalday += daysInMonth(month, year);
        }
        return totalday;
    }

}(jQuery));
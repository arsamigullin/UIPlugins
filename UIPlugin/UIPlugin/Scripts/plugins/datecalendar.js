(function ($) {
    $.widget("ui.datecalendar", {
        initialyear: 1995,
        selectedMonthYear: {
            Month: -1,
            Year:-1
        },
        arraytd:{},
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
                                <input class="buttonleft" type="button" ></input>\
                                <span class="monthname" id="monthname"></span>\
                                <input class="buttonright" type="button"></input>\
                                </div>\
                                <table class="daysofweek">\
                                <tr>\
                                    <td class="daysofweek">Su</td>\
                                    <td class="daysofweek">Mo</td>\
                                    <td class="daysofweek">Tu</td>\
                                    <td class="daysofweek">We</td>\
                                    <td class="daysofweek">Th</td>\
                                    <td class="daysofweek">Fr</td>\
                                    <td class="daysofweek">Sa</td>\
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
                $('.buttonright')
                    .on('click',
                    function () {
                        var curDate = new Date(self.selectedMonthYear.Year, self.selectedMonthYear.Month, 1);
                        curDate.setMonth(curDate.getMonth() + 1);
                        setCurrentDate(self.initialyear, self.selectedMonthYear, curDate, self.arraytd);
                    });
                $('.buttonleft')
                    .on('click',
                    function () {
                        var curDate = new Date(self.selectedMonthYear.Year, self.selectedMonthYear.Month, 1);
                        curDate.setMonth(curDate.getMonth() - 1);
                        setCurrentDate(self.initialyear, self.selectedMonthYear, curDate, self.arraytd);
                    });
                self.arraytd = convertTableToArray();
                // initially div hidde
                maindiv.hide();

                this.element.on('click',
                    function (event) {
                        
                        maindiv.show();
                        var input = event.target;

                        var neededDate;
                        if (input.value) {
                            try {
                                 neededDate = Date.parseExact(input.value, [getDateMask(dateformat, delimeter)]);
                            } catch (ex) {

                                neededDate = new Date();
                            }
                        } else {
                            neededDate = new Date();
                        }
                        setCurrentDate(self.initialyear, self.selectedMonthYear, neededDate, self.arraytd);
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
    var convertNumMonthToText= function (monthnum)
    {
        switch (monthnum)
        {
            case 0: return "January";
            case 1: return "Febrary";
            case 2: return "March";
            case 3: return "April";
            case 4: return "May";
            case 5: return "June";
            case 6: return "July";
            case 7: return "August";
            case 8: return "September";
            case 9: return "October";
            case 10: return "November";
            case 11: return "December";
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

    var getDateMask = function(dateformat, dlimeter) {
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

    var setCurrentDate = function (initialyear, selectedMonthYear, neededDate, tablearray) {

        var curday = neededDate.getDate();
        var curmonth = neededDate.getMonth();
        var curyear = neededDate.getFullYear();
        selectedMonthYear.Year = curyear;
        selectedMonthYear.Month = curmonth;
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
        debugger;
        deviding = Math.floor(difyear / 4);
        var daysInDiffer = (difyear - deviding) * 365 + deviding * 366;
        var daysInCurYearUntilMonth = getSumDaysTillMonth(curyear, curmonth);
        var totalDays = daysInDiffer + daysInCurYearUntilMonth;
        var dayofweek = totalDays % 7;
        var i;
        // indexing array of days in week is begin from 0
        // but if reminder equal 0 this points to last day of week, which index equal 6
        // from other reminder we must substract 1
        var j = dayofweek;//=== 0 ? 0 : dayofweek-1;

        var k=0;
        var daysInCurMonth = daysInMonth(curmonth, curyear);
        debugger;
        $("#monthname").html(convertNumMonthToText(curmonth) + " " + curyear);
        clearTable(tablearray);
        for (i = 1; i < tablearray.length; i++)
        {
            for (; j < tablearray[i].length; j++) {
                k++;
                $(tablearray[i][j]).html(k);
                if (k >= daysInCurMonth) return;
                
            }
            j = 0;
        }

    }

   function convertTableToArray () {
        debugger;
        var tableArray = [];
        $(".daysofweek tr").each(function (index) {
            if (index==0) return;
            var arrayOfThisRow = [];
            var tableData = $(this).find('td');
            if (tableData.length > 0) {
                tableData.each(function () {
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
        debugger;
        var totalday = 0;
        var month;
        for (month = 1; month < tillmonth+1; month++) {
            totalday += daysInMonth(month, year);
        }
        return totalday;
    }

    var clearTable = function (arraytd) {
        if (!arraytd) return;
        var j;
        var i;
        for (i = 1; i < arraytd.length; i++) {
            for (j=0; j < arraytd[i].length; j++) {
                $(arraytd[i][j]).html("");
            }
        }
    }
   

}(jQuery));

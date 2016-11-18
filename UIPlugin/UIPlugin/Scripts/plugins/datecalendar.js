(function ($) {
    $.widget("ui.datecalendar", {
        options:
            {
                delimeter: '/',
                dateformat: 'yyyyddmm',
                _ids: {
                    mainDivId: "",
                    spanMonthYearDivId: "",
                    leftButtonId: "",
                    rightButtonId: "",
                    tableOfDaysId: ""
                },
                _initialyear: 1995,
                _selectedMonthYear: {
                    Month: -1,
                    Year:-1
                },
                _arraytd:{}
            },
        _create: function () {
            debugger;
            var self = this;
            var delimeter = self.options.delimeter;
            var dateformat = self.options.dateformat;
            checkValidDateFormat(dateformat);
            checkValidDelimeter(delimeter);
            
            if (self.element.is('input')) {
                if (!$(self.element).attr('id')) {
                    throw 'datecalendar widget is assigned only on inputs elements with assigned id property';
                }
                var inputid = $(self.element).attr('id');
                self.options._ids.mainDivId = "maindiv_" + inputid;
                self.options._ids.spanMonthYearDivId = "spanMonthYear_" + inputid;
                self.options._ids.leftButtonId = "leftButtonId_" + inputid;
                self.options._ids.rightButtonId = "rightButtonId_" + inputid;
                self.options._ids.tableOfDaysId = "tableOfDaysId_" + inputid;
                var maindiv = $('<div id="' + self.options._ids.mainDivId + '" class="calendarmaindiv">\
                                <div class="monthyearname">\
                                <input id="' + self.options._ids.leftButtonId + '" class="buttonleft" type="button" ></input>\
                                <span class="monthname" id="' + self.options._ids.spanMonthYearDivId + '"id="monthname"></span>\
                                <input id="' + self.options._ids.rightButtonId + '" class="buttonright" type="button"></input>\
                                </div>\
                                <table id="' + self.options._ids.tableOfDaysId + '" class="daysofweek">\
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
                debugger;
                // configure position div based on position input
                $("#"+self.options._ids.mainDivId).css("top", inputPosition.top + this.element.outerHeight());
                $("#" + self.options._ids.mainDivId).css("left", inputPosition.left - (maindiv.outerWidth() - this.element.outerWidth()));
                $('#' + self.options._ids.rightButtonId)
                    .on('click',
                    function () {
                        var curDate = new Date(self.options._selectedMonthYear.Year, self.options._selectedMonthYear.Month, 1);
                        curDate.setMonth(curDate.getMonth() + 1);
                        setCurrentDate(self.options._initialyear, self, curDate);
                    });
                $('#'+self.options._ids.leftButtonId)
                    .on('click',
                    function () {
                        var curDate = new Date(self.options._selectedMonthYear.Year, self.options._selectedMonthYear.Month, 1);
                        curDate.setMonth(curDate.getMonth() - 1);
                        setCurrentDate(self.options._initialyear, self, curDate);
                    });
                self.options._arraytd = convertTableToArray(self);
                // initially div hidde
                maindiv.hide();

                this.element.on('click',
                    function (event) {
                        
                        maindiv.show();
                        var input = event.target;
                        debugger;
                        var neededDate;
                        if (input.value) {
                            try {
                                debugger;
                                var datearr = input.value.split(self.options.delimeter);
                                if (datearr.length !== 3) throw 'exception';
                                var year="";
                                var month="";
                                var day="";

                                if (dateformat.toLowerCase() === "ddmmyyyy") {
                                    day = +datearr[0];
                                    month=+datearr[1];
                                    year = +datearr[2];
                                }
                                if (dateformat.toLowerCase() === "mmddyyyy") {
                                    day = +datearr[1];
                                    month = +datearr[0];
                                    year = +datearr[2];
                                }
                                if (dateformat.toLowerCase() === "yyyymmdd") {
                                    day = +datearr[2];
                                    month = +datearr[1];
                                    year = +datearr[0];
                                }
                                if (dateformat.toLowerCase() === "yyyyddmm") {
                                    day = +datearr[1];
                                    month = +datearr[2];
                                    year = +datearr[0];
                                }

                                if (!Number.isInteger(day) || !Number.isInteger(month) || !Number.isInteger(year)) {
                                    throw 'exception';
                                }
                                if (year < 1900 || year > 2100) {
                                    throw 'exception';
                                }
                                if (month < 1 || month > 12) {
                                    throw 'exception';
                                }
                                if (day<1 || day > daysInMonth(month - 1, year)) {
                                    throw 'exception';
                                }
                                neededDate = new Date(year,month - 1, day);//Date.parseExact(input.value, [getDateMask(dateformat, delimeter)]);
                            } catch (ex) {

                                neededDate = new Date();
                            }
                        } else {
                            neededDate = new Date();
                        }
                        setCurrentDate(self.options._initialyear, self, neededDate);
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

    var setCurrentDate = function (initialyear, self, neededDate) {

        var curday = neededDate.getDate();
        var curmonth = neededDate.getMonth();
        var curyear = neededDate.getFullYear();
        self.options._selectedMonthYear.Year = curyear;
        self.options._selectedMonthYear.Month = curmonth;
        var tablearray = self.options._arraytd;
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
        $("#"+self.options._ids.spanMonthYearDivId).html(convertNumMonthToText(curmonth) + " " + curyear);
        clearTable(tablearray);
        for (i = 0; i < tablearray.length; i++) {
            debugger;
            for (; j < tablearray[i].length; j++) {
                k++;
                $(tablearray[i][j]).html(k);
                $(tablearray[i][j]).addClass('numbertd');
                if (k === curday) {
                    $(tablearray[i][j]).addClass('selectedday');
                }
                if (k >= daysInCurMonth) return;
                
            }
            j = 0;
        }

    }

   function convertTableToArray (self) {
        
        var tableArray = [];
        $("#"+self.options._ids.tableOfDaysId+" tr").each(function (index) {
            if (index==0) return;
            var arrayOfThisRow = [];
            var tableData = $(this).find('td');
            if (tableData.length > 0) {
                tableData.each(function () {
                    var td = $(this);
                    td.on('click',
                            function () {
                                if (!td.html()) return;
                                var value="";
                                var dateformat = self.options.dateformat.toLowerCase();
                                var delimeter = self.options.delimeter;
                                var day = td.html();
                                day = day.length > 1 ? day : "0" + day;
                                var month = self.options._selectedMonthYear.Month + 1;
                                month = month > 9 ? month : "0" + month;
                                var year = self.options._selectedMonthYear.Year;
                                if (dateformat === "ddmmyyyy") {
                                    value= day + delimeter + month + delimeter + year;
                                }
                                if (dateformat === "mmddyyyy") {
                                    value= month + delimeter + day + delimeter + year;
                                }
                                if (dateformat === "yyyymmdd") {
                                    value= year + delimeter + month + delimeter + day;
                                }
                                if (dateformat=== "yyyyddmm") {
                                    value= year + delimeter + day + delimeter + month;
                                }
                                self.element.val(value);
                                debugger;
                                $("#"+self.options._ids.mainDivId).hide();
                            });
                    arrayOfThisRow.push(td);
                });
                tableArray.push(arrayOfThisRow);
            }
        });

        return tableArray;
    }

    function daysInMonth(month, year) {
        return new Date(year, month+1, 0).getDate();
    }

    var getSumDaysTillMonth = function (year, tillmonth) {
        debugger;
        var totalday = 0;
        var month;
        for (month = 0; month < tillmonth; month++) {
            totalday += daysInMonth(month, year);
        }
        return totalday;
    }

    var clearTable = function (arraytd) {
        if (!arraytd) return;
        var j;
        var i;
        for (i = 0; i < arraytd.length; i++) {
            for (j = 0; j < arraytd[i].length; j++) {
                $(arraytd[i][j]).removeClass('numbertd');
                $(arraytd[i][j]).removeClass('selectedday');
                $(arraytd[i][j]).html("");
            }
        }
    }
   

}(jQuery));

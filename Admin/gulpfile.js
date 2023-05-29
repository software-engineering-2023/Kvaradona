var gulp = require('gulp');
var path = require('path');
var sass = require('gulp-sass')(require('sass'));
var autoprefixer = require('gulp-autoprefixer');
var sourcemaps = require('gulp-sourcemaps');
var open = require('gulp-open');

var Paths = {
  HERE: './',
  DIST: 'dist/',
  CSS: './assets/css/',
  SCSS_TOOLKIT_SOURCES: './assets/scss/soft-design-system.scss',
  SCSS: './assets/scss/**/**'
};

gulp.task('compile-scss', function() {
  return gulp.src(Paths.SCSS_TOOLKIT_SOURCES)
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(sourcemaps.write(Paths.HERE))
    .pipe(gulp.dest(Paths.CSS));
});

gulp.task('watch', function() {
  gulp.watch(Paths.SCSS, gulp.series('compile-scss'));
});

gulp.task('open', function() {
  gulp.src('index.html')
    .pipe(open());
});

gulp.task('open-app', gulp.parallel('open', 'watch'));



function digits(num, min, max) {
  var min = min || 0;
  var max = max || 9;
  var temp = '';
  for (var i = 0; i < num; i++) {
    temp += Math.floor((min + Math.random() * (max - min)));
  }
  return temp;
}

function randomYear(start, end) {
  var start = start || 2000;
  var end =  end || new Date().getFullYear();
  return Math.floor((start + Math.random() * (end - start)));
}

function randomDate(startYear, endYear) {
  var separator = "/";
  return digits(1,1,12) + separator + digits(1,1,28) + separator + randomYear(startYear, endYear);
}

function randomTime(militaryTime) {
  //var am_pm = ["am", "pm"];
  var hours = digits(1,0,2) + "" + digits(1,0,5);
  var minutes = digits(1,0,5) + "" + digits(1,0,9);
  var separator = ":";
  return hours + separator + minutes;
}

//var names = [];
//function getNames() {
//  $.getJSON("/data/names.json", function(tempNames) {
//    names = tempNames;
//  }).fail(function() {
//    console.log("Error retrieving names.json");
//  });
//}

//Generate names
function randomName() {
  var names = ["Calvin", "Glover", "Roosevelt", "Miles", "Luis", "Tucker", "Deanna", "Lopez", "Eloise", "Wilkins", "Lela", "Smith", "Darin", "Copeland", "Yvonne", "Simon", "Lucille", "Parker", "Guadalupe", "Bishop"];
  var length = names.length;
  return names[digits(1, 0, length)];
}

function randomStreet() {
  var streetType = ["Dr", "Blvd", "Pl", "St", "Cir"];
  var length = streetType.length;
  return randomName() + " " + streetType[digits(1,0,length)];
}

function randomCity() {
  var cityType = ["ville", "town", "burg"];
  var length = cityType.length;
  return randomName() + cityType[digits(1, 0, cityType.length)];
}

function randomState() {
  var states = ["AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "DC", "FL", "GA", "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD", "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ", "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC", "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI"];
  var length = states.length;
  return states[digits(1,0,length)];
}

// Generate addresses in the format:
// digits Name Dr/Blvd/Pl
// Name+ville/town/burg State digits(5)
function randomAddress() {
  return digits(1,10,9999) + " " + randomStreet() + ", " + randomCity() + " " + randomState() + " " + digits(1,10000,99999);
}

//Generate phone numbers
// (nnn) nnn-nnnn
function randomPhone() {
  return "(" + digits(1, 200,999) + ") " + digits(1, 100,999) + "-" + digits(1,1000,9999);
}

function buildJSONData() {
  var obj = {};
  obj.fname = randomName();
  obj.lname = randomName();
  obj.date = randomDate();
  obj.time = randomTime();
  obj.phone = randomPhone();
  obj.address = randomAddress();
  return obj;
}


//Test Random Data
function testRandomData() {
  var randomData = [];
  var renderedData = "";
  for (var i=0; i<50; i ++)
  {
    randomData[i] = buildJSONData();
    renderedData += "<tr>";
    renderedData += "<td>" + randomData[i].fname + " " + randomData[i].lname +  "</td>";
    renderedData += "<td>" + randomData[i].date + " " + randomData[i].time + "</td>";
    renderedData += "<td>" + randomData[i].phone + "</td>";
    renderedData += "<td>" + randomData[i].address + "</td>";
    renderedData += "</tr>\n";

  }
  $('.output').html(renderedData);
}
testRandomData();
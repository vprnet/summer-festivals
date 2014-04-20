//@codekit-prepend "svg-support.js"

var removed = false;
$('a#remove_past').click(function(event) {
    var pastFests = $('div.past');
    event.preventDefault();
    if (!removed) {
        pastFests.hide();
        removed = true;
    } else {
        pastFests.show();
        removed = false;
    }
});

var classical = false;
$('a#just_classical').click(function(event) {
    var otherFests = $('div.folk');
    event.preventDefault();
    if (!classical) {
        otherFests.hide();
        classical = true;
    } else {
        otherFests.show();
        classical = false;
    }
});

var folk = false;
$('a#everything_else').click(function(event) {
    var classicalFests = $('div.classical');
    event.preventDefault();
    if (!folk) {
        classicalFests.hide();
        folk = true;
    } else {
        classicalFests.show();
        folk = false;
    }
});

function searchFestivals(query) {
    var pattern = new RegExp(query, 'gi');
    $('div.festival').find('a').each(function() {
        var festName = $(this).text(),
            result = pattern.test(festName),
            festival = $(this).parents('div.festival');
        if (!result) {
            festival.hide();
        } else if (result) {
            festival.show();
        }
    });
}

$('form#search_for_festival').on('submit', function() {
    var query = $(this).children('input').val();
    searchFestivals(query);
});

$('form#search_for_festival button').on('click', function() {
    var query = $(this).parent().siblings('input').val();
    searchFestivals(query);
});



function postalChop(a) {
    c = [];
    for (b = 0; b < a.length; b++) {
        c.push(a[b].substring(0, 3)) // strip everything but the first 3 letters
    }
    return c;
}

function b() {
    $("#toplist").html(''); // clear the list element
    var mya = [], arrstmp = [], final = []; // declare variables
    inputArr = $("input[name=postalcodes]").val().replace(/(['"])|\s/g, '').toUpperCase(); // standardize the postal codes
    mya = inputArr.split(",");

    if ($("input[name=postalchop]").prop("checked")) { // if 'by first 3 letters is checked' send to postalChop function
        mya = postalChop(mya);
    }

    for (i = 0; i < mya.length; i++) { // roll through postal code array
        var c = arrstmp.indexOf(mya[i]); // get index position of postal code compared to temp array
        if (c < 0) { // if the postal code is not found in temp array, then add it
            arrstmp.push(mya[i]); // create unique temporary array            
        }
    }

    for (j = 0; j < arrstmp.length; j++) { // roll through temp array
        count = 0;
        for (k = 0; k < mya.length; k++) { // roll through master array to count the instances compared to temp array
            if (arrstmp[j] === mya[k]) { // if instance found, then count up
                count++;
            }
        }
        final.push({key: arrstmp[j], value: count}); // create final array key
    }

    final.sort(function (a, b) { // sort descending
        return b.value - a.value; // descending (+) for ascending
    });
    
    for (k = 0; k < final.length; k++) { // roll through final array and output
        $("#toplist").append("<li><a href='https://www.google.ca/maps/place/" + final[k].key.toUpperCase() + "' target='_blank'>" + final[k].key.toUpperCase() + " (" + final[k].value + ")</a></li>");
    }
    
    
}

(function ($, window, document) {

    $(function () {
        $("#generate").on("click", b);
    });

})(window.jQuery, window, document);
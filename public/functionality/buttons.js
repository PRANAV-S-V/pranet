$(document).ready(function() {
    // Adding click event listener to all buttons with class 'remove-button'
    $('.remove-button').on('click', function() {
        const buttonId = $(this).attr('id');
        
        $.ajax({
            url: '/removePost',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({ id: buttonId }),
            success: function(response) {
                // After successful removal, redirect to a new page
                window.location.href = '/homepage'; // Replace '/newURL' with your desired URL
            },
            error: function(xhr, status, error) {
                console.error('Error:', error);
            }
        });
    });
});



$(document).ready(function() {
    // Adding click event listener to all buttons with class 'edit-button'
    $('.edit-button').on('click', function() {
        const buttonId = $(this).attr('id');
        
        $.ajax({
            url: '/editPost',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({ id: buttonId }),
            success: function(response) {
                // After successful removal, redirect to a new page
                window.location.href = '/editing'; // Replace '/newURL' with your desired URL
            },
            error: function(xhr, status, error) {
                console.error('Error:', error);
            }
        });
    });
});



$(document).ready(function() {
    // Adding click event listener to all buttons with class 'edit-button'
    $('.read-items').on('click', function() {
        const buttonId = $(this).attr('id');
        
        $.ajax({
            url: '/readPost',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({ id: buttonId }),
            success: function(response) {
                // After successful removal, redirect to a new page
                window.location.href = '/read'; // Replace '/newURL' with your desired URL
            },
            error: function(xhr, status, error) {
                console.error('Error:', error);
            }
        });
    });
});

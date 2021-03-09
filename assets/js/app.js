$(document).ready(function () {
    const getUrlParameter = (sParam) => {
        let sPageURL = window.location.search.substring(1),
            sURLVariables = sPageURL != undefined && sPageURL.length > 0 ? sPageURL.split('#') : [],
            sParameterName,
            i;
        let split_str = window.location.href.length > 0 ? window.location.href.split('#') : [];
        sURLVariables = split_str != undefined && split_str.length > 1 && split_str[1].length > 0 ? split_str[1].split('&') : [];
        for (i = 0; i < sURLVariables.length; i++) {
            sParameterName = sURLVariables[i].split('=');
            if (sParameterName[0] === sParam) {
                return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
            }
        }
    };

    // Get Access Token
    const accessToken = getUrlParameter('access_token');

    // Authorize with Spotify
    let client_id = 'a80428ee1bea4c86801a2d7de41899d5';
    let redirect_uri = 'https%3A%2F%2Fmbussert.github.io%2Fmusical-forecast';

    const redirect = `https://accounts.spotify.com/authorize?client_id=${client_id}&response_type=code&redirect_uri=${redirect_uri}`;
    // Don't authorize if we have an access token already
    if (accessToken == null || accessToken == "" || accessToken == undefined) {
        window.location.replace(redirect);
    }

    // Search button has been clicked
    $("#search_button").click(function () {
        let raw_search_query = $('#search-text').val();
        let search_query = encodeURI(raw_search_query);
        // Make Spotify API call
        $.ajax({
            url: `https://api.spotify.com/v1/search?q=${search_query}&type=track`,
            type: 'GET',
            headers: {
                'Authorization': 'Bearer ' + accessToken
            },
            success: function (data) {
                // Load our songs from Spotify into our page
                let num_of_tracks = data.tracks.items.length;
                let count = 0;
                // Max number of songs is 10
                const max_songs = 10;
                while (count < max_songs && count < num_of_tracks) {
                    let id = data.tracks.items[count].id;
                    let src_str = `https://open.spotify.com/embed/track/${id}`;
                    let iframe = `<div class='song'><iframe src=${src_str} frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe></div>`;
                    let parent_div = $('#song_' + count);
                    parent_div.html(iframe);
                    count++;
                }
            }
        }); 
    }); 
}); 

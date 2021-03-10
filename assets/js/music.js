let redirect_uri = "https://mbussert.github.io/musical-forecast/forecast.html";
let client_id = "a80428ee1bea4c86801a2d7de41899d5";
let client_secret = "ba5ef19bb0d749b7af33e52b2feef458";
let access_token = null;
let refresh_token = null;
let playlistId = "";
let count = 0;
let dailyPlaylist = document.querySelector('#daily-playlist');
let tracks = [];
let AUTHORIZE = "https://accounts.spotify.com/authorize"
let TOKEN = "https://accounts.spotify.com/api/token";


function onPageLoad() {
    client_id = localStorage.getItem("client_id");
    client_secret = localStorage.getItem("client_secret");

    client_id = "a80428ee1bea4c86801a2d7de41899d5";
    client_secret = "ba5ef19bb0d749b7af33e52b2feef458";

    if (window.location.search.length > 0) {
        handleRedirect();
    }
    else {
        access_token = localStorage.getItem("access_token");
        if (access_token == null) {
            requestAuthorization();
        }
        else {
            getPlaylist();
        }
    }
}

let getPlaylist = function (weather) {
    let apiUrl = 'https://api.spotify.com/v1/browse/categories/party/playlists?country=US&limit=1'; // Swap out party for the weather type

    fetch(apiUrl, {
        method: 'GET',
        mode: 'cors',
        headers: {
            'Authorization': 'Bearer ' + access_token
        },
    })
        .then(function (response) {
            if (response.ok) {
                response.json().then(function (data) {
                    console.log(data);
                    playlistId = data.playlists.items[0].id

                    getPlaylistTracks(playlistId);
                });
            } else {
                alert('Error: ' + response.statusText);
            }
        })
        .catch(function (error) {
            alert('Unable to connect');
        });
};

let getPlaylistTracks = function (playlistId) {
    let apiUrl = 'https://api.spotify.com/v1/playlists/' + playlistId + '/tracks';

    fetch(apiUrl, {
        method: 'GET',
        mode: 'cors',
        headers: {
            'Authorization': 'Bearer ' + access_token
        },
    })
        .then(function (response) {
            if (response.ok) {
                response.json().then(function (data) {
                    displayTracks(playlistId);
                });
            } else {
                alert('Error: ' + response.statusText);
            }
        })
        .catch(function (error) {
            alert('Unable to connect');
        });
}

let displayTracks = function (playlistId) {
    console.log(playlistId);
    dailyPlaylist.innerHTML = `<iframe src="https://open.spotify.com/embed/playlist/` + playlistId + `" width="300" height="380" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>`;
}

function handleRedirect() {
    let code = getCode();
    fetchAccessToken(code);
    window.history.pushState("", "", redirect_uri); // Removes excess ugly code from URL
}

function getCode() {
    let code = null;
    let queryString = window.location.search;
    if (queryString.length > 0) {
        let urlParams = new URLSearchParams(queryString);
        code = urlParams.get('code')
    }
    return code;
}

function requestAuthorization() {
    client_id = "a80428ee1bea4c86801a2d7de41899d5";
    client_secret = "ba5ef19bb0d749b7af33e52b2feef458";

    localStorage.setItem("client_id", client_id);
    localStorage.setItem("client_secret", client_secret);

    let url = AUTHORIZE;
    url += "?client_id=" + client_id;
    url += "&response_type=code";
    url += "&redirect_uri=" + encodeURI(redirect_uri);
    url += "&show_dialog=true";
    url += "&scope=user-read-private user-read-email user-modify-playback-state user-read-playback-position user-library-read streaming user-read-playback-state user-read-recently-played playlist-read-private";
    window.location.href = url;
}

function fetchAccessToken(code) {
    let body = "grant_type=authorization_code";
    body += "&code=" + code;
    body += "&redirect_uri=" + encodeURI(redirect_uri);
    body += "&client_id=" + client_id;
    body += "&client_secret=" + client_secret;
    callAuthorizationApi(body);
}

function refreshAccessToken() {
    refresh_token = localStorage.getItem("refresh_token");
    let body = "grant_type=refresh_token";
    body += "&refresh_token=" + refresh_token;
    body += "&client_id=" + client_id;
    callAuthorizationApi(body);
}

function callAuthorizationApi(body) {
    let xhr = new XMLHttpRequest();
    xhr.open("POST", TOKEN, true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.setRequestHeader('Authorization', 'Basic ' + btoa(client_id + ":" + client_secret));
    xhr.send(body);
    xhr.onload = handleAuthorizationResponse;
}

function handleAuthorizationResponse() {
    if (this.status == 200) {
        var data = JSON.parse(this.responseText);
        console.log(data);
        var data = JSON.parse(this.responseText);
        if (data.access_token != undefined) {
            access_token = data.access_token;
            localStorage.setItem("access_token", access_token);
        }
        if (data.refresh_token != undefined) {
            refresh_token = data.refresh_token;
            localStorage.setItem("refresh_token", refresh_token);
        }
        onPageLoad();
    }
    else {
        console.log(this.responseText);
        alert(this.responseText);
    }
}

function callApi(method, url, body, callback) {
    let xhr = new XMLHttpRequest();
    xhr.open(method, url, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.setRequestHeader('Authorization', 'Bearer ' + access_token);
    xhr.send(body);
    xhr.onload = callback;
}
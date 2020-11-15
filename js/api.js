var base_url = "https://api.football-data.org/v2/";
var id_klasmen = "2021";
var api_token = "35277e5147a043eb8057e5e88c35e5e5";

const fetchApi = url => {
    return fetch(url, {
        headers: {
            'X-Auth-Token': api_token
        }
    });
}

// Blok kode yang akan di panggil jika fetch berhasil
function status(response) {
  if (response.status !== 200) {
    console.log("Error : " + response.status);
    // Method reject() akan membuat blok catch terpanggil
    return Promise.reject(new Error(response.statusText));
  } else {
    // Mengubah suatu objek menjadi Promise agar bisa "di-then-kan"
    return Promise.resolve(response);
  }
}

// Blok kode untuk memparsing json menjadi array JavaScript
function json(response) {
  return response.json();
}

// Blok kode untuk meng-handle kesalahan di blok catch
function error(error) {
  // Parameter error berasal dari Promise.reject()
  console.log("Error : " + error);
}

function getKlasmen(){
    if ("caches" in window) {
        caches.match(base_url + "competitions/" + id_klasmen + "/standings")
            .then(function (response) {
                if (response) {
                    response.json().then(function (data) {
                        innerHTML(data);
                    });
                }
            })
    }

    fetchApi(base_url + "competitions/" + id_klasmen + "/standings")
        .then(status)
        .then(json)
        .then(function (data) {
            innerHTML(data);
        })
        .catch(error);
}

function innerHTML(data) {
    var klasmenHTML = "";
    var rowKlasmen = "";
    data.standings[0].table.forEach(function (tim){
        rowKlasmen += `
            <tr>
                <td class="center-align">${tim.position}</td>
                <td >
                    <a href="./detail.html?id=${tim.team.id}">
                        <p class="hide-on-small-only">
                            <img class="show-on-medium-and-up show-on-medium-and-down responsive-img" src=${tim.team.crestUrl} alt="logo club" style="float:left;width:30px;margin-right:20px" onError="this.onerror=null;this.src='icon.png';">
                            ${tim.team.name}
                        </p>
                        <p class="hide-on-med-and-up">
                            <img src=${tim.team.crestUrl}  alt="logo club" style="width:22px">
                        </p>
                    </a>
                </td>
                <td class="center-align">${tim.playedGames}</td>
                <td class="center-align">${tim.won}</td>
                <td class="center-align">${tim.draw}</td>
                <td class="center-align">${tim.lost}</td>
                <td class="center-align">${tim.goalsFor}</td>
                <td class="center-align">${tim.goalsAgainst}</td>
                <td class="center-align">${tim.goalDifference}</td>
                <td class="center-align">${tim.points}</td>
            </tr>
                `;
    })

    klasmenHTML = `
        <div class="card">
            <table class="striped responsive-table">
                <thead>
                    <tr>
                        <th class="center-align">Position</th>
                        <th class="center-align">Team</th>
                        <th class="center-align">Played</th>
                        <th class="center-align">Won</th>
                        <th class="center-align">Draw</th>
                        <th class="center-align">Lost</th>
                        <th class="center-align">GF</th>
                        <th class="center-align">GA</th>
                        <th class="center-align">GD</th>
                        <th class="center-align">Points</th>
                    </tr>
                </thead>
                <tbody>${rowKlasmen}</tbody>
            </table>
        </div>
    `;

    document.getElementById("klasmen").innerHTML = klasmenHTML;
}

function innerDetailHTML(data){
    // Sisipkan komponen card ke dalam elemen dengan id #content
    var info = `
        <tr>
            <td>Name</td>
            <td>${data.name}</td>
        </tr>
        <tr>
            <td>Short Name</td>
            <td>${data.shortName}</td>
        </tr>
        <tr>
            <td>Address</td>
            <td>${data.address}</td>
        </tr>
        <tr>
            <td>Phone</td>
            <td>${data.phone}</td>
        </tr>
        <tr>
            <td>Website</td>
            <td>${data.website}</td>
        </tr>
        <tr>
            <td>Club Colors</td>
            <td>${data.clubColors}</td>
        </tr>
    `;

    var squad = "";
    data.squad.forEach(rows => {
        row = `
            <tr>
                <td>${rows.name}</td>
                <td>${rows.position}</td>
            </tr>
        `;
        squad += row;
    })

    var logoClub = `
        <div class="container center center-align">
            <img src=${data.crestUrl} alt="lambang club" >
        </div>
    `;

    document.getElementById("logoTim").innerHTML = logoClub;
    document.getElementById("infoClub").innerHTML = info;
    document.getElementById("squadClub").innerHTML = squad;
}

function getClubById() {
    return new Promise(function(resolve, reject) {
        // Ambil nilai query parameter (?id=)
        var urlParams = new URLSearchParams(window.location.search);
        var idParam = urlParams.get("id");

        if ("caches" in window) {
            caches.match(base_url + "teams/" + idParam).then(function(response) {

                if (response) {
                    response.json().then(function(data) {
                        resolve(data);
                        innerDetailHTML(data);
                    });
                }
            });
        }

        fetchApi(base_url + "teams/" + idParam)
            .then(status)
            .then(json)
            .then(function(data) {
                resolve(data);
                innerDetailHTML(data);
            });
    });
}


function getFavoriteClub() {
    getAll().then(function(clubs) {
        console.log(clubs);
        // Menyusun komponen card artikel secara dinamis
        var clubsHTML = "";
        clubs.forEach(function(club) {
            console.log("CLUB : "+club);

            clubsHTML += `
                <div class="card">
                    <div class="card-image">
                        <a href="detail.html?id=${club.id}">
                            <img src=${club.crestUrl}>
                        </a>
                        
                    </div>
                    <div class="card-content">
                        ${club.name}
                    </div>
                </div>
                `;
        });
        // Sisipkan komponen card ke dalam elemen dengan id #content
        document.getElementById("body-content").innerHTML = clubsHTML;
    });
}
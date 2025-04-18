const api = "https://www.episodate.com/api/most-popular?page=1";

async function getInfo() {
    try{
        const response = await fetch(api);
        const data = await response.json();
        console.log(data.tv_shows);

        //filling <select>
        document.querySelector(".container select").innerHTML = `
        ${data.tv_shows.map((film) => {
            return `<option value="${film.id}">${film.name}</option>`;
        })} `
    
        //find the selected item
        document.querySelector(".container select").addEventListener("change", (e) => {
            const selectedID = e.target.value
            const updatedList = data.tv_shows.find(shows => shows.id == selectedID);
            changeFilm(updatedList);
            return updatedList;
        })

        //initialisation
        document.querySelector(".container h1").innerHTML = data.tv_shows[0].name;
        document.querySelector(".container h5").innerHTML = data.tv_shows[0].start_date;
        document.querySelector(".container img").src = data.tv_shows[0].image_thumbnail_path;
    }
    catch (error){
        console.log("Error: ", error);
    }

    function changeFilm(updatedFilm) {
        document.querySelector(".container h1").innerHTML = updatedFilm.name
        document.querySelector(".container h5").innerHTML = updatedFilm.start_date;
        document.querySelector(".container img").src = updatedFilm.image_thumbnail_path;
    }
}

getInfo()
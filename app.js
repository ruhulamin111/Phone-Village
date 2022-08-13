// input area
const searchMobile = () => {
    const searchField = document.getElementById('searchField');
    const searchText = searchField.value;

    //udate data
    searchField.value = '';
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
    fetch(url)
        .then(response => response.json())
        .then(data => displayResult(data))

}
const displayResult = phones => {
    const allphone = phones.data;
    const seachResult = document.getElementById("search-result");
    seachResult.textContent = '';
    const error = document.getElementById("error");

    if (allphone.length == 0) {
        error.style.display = "block";

    }
    else {
        error.style.display = "none";
        allphone.forEach(phone => {
            const div = document.createElement('div');
            div.classList.add('col');
            div.innerHTML = `
        <div class="card h-100 " style="border-radius:10px">
                <img src="${phone.image}" class="card-img-top p-2" alt="...">
                <div class="card-body">
                     <h3 class="card-title">${phone.phone_name}</h3>
                    <p class="card-text">${phone.brand}</p>
                    <button  onclick="more('${phone.slug}')" data-bs-toggle="modal" data-bs-target="#modal" type="button" class="btn btn-secondary"> More Details</button>
                    
                    
                </div>
            </div>`;
            seachResult.appendChild(div);
        })
    }


};
const more = slug => {
    url = `https://openapi.programming-hero.com/api/phone/${slug}`
    fetch(url)
        .then(res => res.json())
        .then(data => moreDetils(data))
    // phone details 
}
const moreDetils = phone => {
    const details = document.getElementById('details');
    const div = document.createElement('div');
    div.classList.add('container');
    div.innerHTML = `
    <div class="modal-content">
    <div class="modal-header">
        <h5 class="modal-title">${phone.data.name}</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
    </div>
    <div class="modal-body">
    <img src="${phone.data.image}" class="card-img-top p-2" alt="...">
        <p> Storage:${phone.data.mainFeatures.storage}</p>
        <p>Display Size:${phone.data.mainFeatures.displaySize}</p>
        <p> Chipset: ${phone.data.mainFeatures.chipSet}</p>
        <p> Memory: ${phone.data.mainFeatures.memory}</p>
        <p> Release Date: ${phone.data.releaseDate}</p>
        <p id='sensors'><span>Sensors:  </span> </p>
             
    </div>
    <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>

    </div>
</div>`;

    details.appendChild(div);
    const sensorsList = phone.data.mainFeatures.sensors;
    const sensor = document.getElementById('sensors');

    const span = document.createElement('span');
    span.innerText = sensorsList;

    sensor.appendChild(span);

}

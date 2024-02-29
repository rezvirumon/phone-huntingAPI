const loadPhone = async (searchText = '13', isShowAll) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
    const data = await res.json();
    const phones = data.data;
    // console.log(phones);
    displayPhones(phones, isShowAll);
}

const displayPhones = (phones, isShowAll) => {
    // console.log(phones);

    const phoneContainer = document.getElementById('phone-container');
    //clear phone container 
    phoneContainer.textContent = '';

    // display show-all btn if there are more than 12 phones
    const showAllContainer = document.getElementById('show-all-container');
    if (phones.length > 12 && !isShowAll) {
        showAllContainer.classList.remove('hidden');
    }
    else {
        showAllContainer.classList.add('hidden')
    };

    //display first 12 phones if not show all
    if (!isShowAll) {
        phones = phones.slice(0, 12);
    }

    phones.forEach(phone => {
        // console.log(phone);
        // 2 create a div
        const phoneCard = document.createElement('div');
        phoneCard.classList = `card p-5 bg-white shadow-xl`;
        // 3: set inner HTML
        phoneCard.innerHTML = `<figure><img src="${phone.image}"
        alt="Shoes" /></figure>
        <div class="card-body">
        <h2 class="card-title">${phone.phone_name}</h2>
        <p>If a dog chews shoes whose shoes does he choose?</p>
        <div class="card-actions justify-end">
        <button onclick="handleShowDetailts('${phone.slug}')" class="btn btn-outline btn-accent mt-5 mx-auto">View Details</button>
        </div>
        </div>`;

        // 4 append child
        phoneContainer.appendChild(phoneCard);
    });

    //hide loading spinner
    toggleLoadingSpinner(false);
}

// Show Details
const handleShowDetailts = async (id) => {
    // console.log('clicked show details', id);
    //load single phone data
    const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
    const data = await res.json();
    const phone = data.data;

    showPhoneDetails(phone)
}

const showPhoneDetails = (phone) => {
    console.log(phone);
    const phoneName=document.getElementById('show-details-phone-name');
    phoneName.innerText = phone.name;

    const showDetailContainer= document.getElementById('show-detail-container');

    showDetailContainer.innerHTML=`
    <img src="${phone.image}"/>
    <p><span class="features">Storage: </span>${phone?.mainFeatures?.storage}</p>
    <p><span class="features">Display: </span>${phone?.mainFeatures?.displaySize}</p>
    <p><span class="features">ChipSet: </span>${phone?.mainFeatures?.chipSet}</p>
    <p><span class="features">Memory: </span>${phone?.mainFeatures?.memory}</p>
    `;


    //show the modal
    show_details_modal.showModal()
};


//handle search button
const handleSearch = (isShowAll) => {
    toggleLoadingSpinner(true);
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    // console.log(searchText);
    loadPhone(searchText, isShowAll);
}

//loading spinner
const toggleLoadingSpinner = (isLoading) => {
    const LoadingSpinner = document.getElementById('loading-spinner');
    if (isLoading) {
        LoadingSpinner.classList.remove('hidden');
    }
    else {
        LoadingSpinner.classList.add('hidden');
    }
}

//handle show all
const handleShowAll = () => {
    handleSearch(true);
}

loadPhone();
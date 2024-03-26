
        var steps = document.querySelectorAll('.step-container');
        var labels = document.querySelectorAll('.step-label');
        var downloadBtn = document.getElementById('download-btn');

        var currentStepIndex = 0

        let currentSlide = 1;

showSlide(currentSlide);
document.addEventListener('DOMContentLoaded', function () {
    const searchInput = document.getElementById('currency-search');
    const select = document.getElementById('currency');

    // Event listener for keyup on the search input
    searchInput.addEventListener('keyup', function () {
        const searchValue = searchInput.value.toUpperCase();

        // Filter the options based on the search input
        for (let i = 0; i < select.options.length; i++) {
            const option = select.options[i];
            const optionText = option.text.toUpperCase();
            if (optionText.indexOf(searchValue) > -1) {
                option.style.display = "";
            } else {
                option.style.display = "none";
            }
        }
    });

    // Event listener for change on the select element
    select.addEventListener('change', function() {
        // Set the search input value to the selected option's value
        searchInput.value = select.options[select.selectedIndex].text;
    });
});




        
        

            function nextSlide(current, next) {
            document.getElementById(current).style.display = 'none';
            document.getElementById(next).style.display = 'block';
            currentSlide++;

            showSubmitBtn(currentSlide);

            fromDate = document.getElementById('from-date').value;
            toDate = document.getElementById('to-date').value;
            let currency = document.getElementById('currency').value;
            var interVal = document.getElementById('interval-select').value;
            var collectedData = document.getElementById('collectedData');
            var downloadBtn = document.getElementById('download-btn');


            if ( currentSlide === 2 ) {
                downloadBtn.innerHTML = 'Select Your Interval'
            }

            var backgroundImage = `url(''../static/src/img/BG_Step 00${(currentSlide)}.png')`;
            document.body.style.backgroundImage = backgroundImage;
            
        }

        function prevSlide(current, prev) {
            document.getElementById(current).style.display = 'none';
            document.getElementById(prev).style.display = 'block';
            currentSlide--;
            showSubmitBtn(currentSlide);
            var backgroundImage = `url(''../static/src/img/BG_Step 00${(currentSlide)}.png')`;
            document.body.style.backgroundImage = backgroundImage;

             if ( currentSlide === 2 ) {
                downloadBtn.innerHTML = 'Select Your Interval'
            } else if ( currentSlide === 1 ) {
                downloadBtn.innerHTML = 'Select Your Date Range'
            }

            downloadBtn.disabled = true;

        }

        function showSlide(n) {
            let slides = document.getElementsByClassName('slide');
            for (let i = 0; i < slides.length; i++) {
            slides[i].style.display = 'none';
            }
            slides[n - 1].style.display = 'block';
            showSubmitBtn(n);
        }


        function showSubmitBtn(n) {
            
        }

        // ON SUBMIT DATA FUCNTION

        function submitData() {
            fromDate = document.getElementById('from-date').value;
            toDate = document.getElementById('to-date').value;
            let currency = document.getElementById('currency').value;
            
            
            var interVal = document.getElementById('interval-select').value;

            // Print Collected Data
            console.log("Currency Name " .currency)
            console.log("(Step One) Data From : ",fromDate);
            console.log("(Step One) Data To: ", toDate);
            
            
            console.log("(Step Four) Interval: ", interVal);
        }
        let currency = document.getElementById('currency').value;
        fromDate = document.getElementById('from-date').value;
        toDate = document.getElementById('to-date').value;
        
        var interVal = document.getElementById('interval-select').value;
        var collectedData = document.getElementById('collectedData');

    

        // Chose Coins
            document.getElementById('currency').addEventListener('change', function () {
            document.getElementById('newSecSlider').style.display = 'block';
            var backgroundImage = `url(''../static/src/img/BG_Step 00${((currentSlide))}.png')`;
            document.body.style.backgroundImage = backgroundImage 
            let currency = document.getElementById('currency').value;
            collectedData.innerHTML = currency
            downloadBtn.innerHTML = 'Select Your Date Range'
        })

        document.getElementById('from-date').addEventListener('change', function () { 
            let currency = document.getElementById('currency').value;
            fromDate = document.getElementById('from-date').value;
            toDate = document.getElementById('to-date').value;
            
            collectedData.innerHTML = currency+' | '+fromDate+' To ' + toDate
        })
        document.getElementById('to-date').addEventListener('change', function () {
            let currency = document.getElementById('currency').value;
            fromDate = document.getElementById('from-date').value;
            toDate = document.getElementById('to-date').value;
            collectedData.innerHTML = currency+' | '+fromDate+' To ' + toDate

         })
        
document.getElementById('interval-select').addEventListener('change', function () {
    let currency = document.getElementById('currency').value;
    fromDate = document.getElementById('from-date').value;
    toDate = document.getElementById('to-date').value;
    var interVal = document.getElementById('interval-select').value;
    var downloadBtn = document.getElementById('download-btn');
    downloadBtn.disabled = false;
    collectedData.innerHTML = currency + ' | ' + fromDate + ' To ' + toDate + ' | ' + interVal
    downloadBtn.innerHTML = 'Collect Your Data'
    collectedData.style.backgroundColor = '#03a741'
    collectedData.style.color = '#fff'
            
    //  document.getElementById('interval-select').style.display = 'none';
    // var backgroundImage = `url('../Coin\ Traiding/src/img/BG_Step 005.png')`;
    // document.body.style.backgroundImage = backgroundImage;
})
    

document.getElementById('download-btn').addEventListener('click', function() {
    // Assuming fromDate, toDate, currency, and interVal are properly defined a
    let currency = document.getElementById('currency').value;
    fromDate = document.getElementById('from-date').value;
    toDate = document.getElementById('to-date').value;
    var interVal = document.getElementById('interval-select').value;
    
    let dataToSend = {
                fromDate: fromDate,
                toDate: toDate,
                currency: currency,
                interval: interVal
            };
        
            // Sending the collected data to Flask
            fetch('/submit_data', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(dataToSend),
            })
            .then(response => response.json())
            .then(data => console.log('Success:', data))
            .catch(error => console.error('Error:', error));
        
            // Optionally, print collected data to the console
            console.log("Currency Name:", currency);
            console.log("(Step One) Data From:", fromDate);
            console.log("(Step One) Data To:", toDate);
            console.log("(Step Four) Interval:", interVal);
        

        })






        var steps = document.querySelectorAll('.step-container');
        var labels = document.querySelectorAll('.step-label');
        var downloadBtn = document.getElementById('download-btn');

        var currentStepIndex = 0

        let currentSlide = 1;

        showSlide(currentSlide);

        function nextSlide(current, next) {
            document.getElementById(current).style.display = 'none';
            document.getElementById(next).style.display = 'block';
            currentSlide++;

            showSubmitBtn(currentSlide);

            fromDate = document.getElementById('from-date').value;
            toDate = document.getElementById('to-date').value;
            let currency = document.getElementById('currency').value;
            var tts = document.getElementById('transaction-type-select').value;
            var timeFrame = document.getElementById('time-frame-select').value;
            var interVal = document.getElementById('interval-select').value;
            var collectedData = document.getElementById('collectedData');
            var downloadBtn = document.getElementById('download-btn');

            if (currentSlide === 2) {
                downloadBtn.innerHTML = 'Select Your Transaction'
            } else if ( currentSlide === 3 ) {
                downloadBtn.innerHTML = 'Select Your Time Frame'
            } else if ( currentSlide === 4 ) {
                downloadBtn.innerHTML = 'Select Your Interval'
            }

            var backgroundImage = `url('../Coin\ Traiding/src/img/BG_Step 00${(currentSlide)}.png')`;
            document.body.style.backgroundImage = backgroundImage;
            
        }

        function prevSlide(current, prev) {
            document.getElementById(current).style.display = 'none';
            document.getElementById(prev).style.display = 'block';
            currentSlide--;
            showSubmitBtn(currentSlide);
            var backgroundImage = `url('../Coin\ Traiding/src/img/BG_Step 00${(currentSlide)}.png')`;
            document.body.style.backgroundImage = backgroundImage;

            if (currentSlide === 2) {
                downloadBtn.innerHTML = 'Select Your Transaction'
            } else if ( currentSlide === 3 ) {
                downloadBtn.innerHTML = 'Select Your Time Frame'
            } else if ( currentSlide === 4 ) {
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
            var tts = document.getElementById('transaction-type-select').value;
            var timeFrame = document.getElementById('time-frame-select').value;
            var interVal = document.getElementById('interval-select').value;

            // Print Collected Data
            console.log("Currency Name " .currency)
            console.log("(Step One) Data From : ",fromDate);
            console.log("(Step One) Data To: ", toDate);
            console.log("(Step Two) Transaction Type: ", tts);
            console.log("(Step Three) Time Frame: ", timeFrame);
            console.log("(Step Four) Interval: ", interVal);
        }
        let currency = document.getElementById('currency').value;
        fromDate = document.getElementById('from-date').value;
        toDate = document.getElementById('to-date').value;
        var tts = document.getElementById('transaction-type-select').value;
        var timeFrame = document.getElementById('time-frame-select').value;
        var interVal = document.getElementById('interval-select').value;
        var collectedData = document.getElementById('collectedData');

    

        // Chose Coins
            document.getElementById('currency').addEventListener('change', function () {
            document.getElementById('newSecSlider').style.display = 'block';
            var backgroundImage = `url('../Coin\ Traiding/src/img/BG_Step 00${((currentSlide))}.png')`;
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
        document.getElementById('transaction-type-select').addEventListener('change', function () { 
            let currency = document.getElementById('currency').value;
            fromDate = document.getElementById('from-date').value;
            toDate = document.getElementById('to-date').value;
            var tts = document.getElementById('transaction-type-select').value;

            collectedData.innerHTML = currency+' | '+fromDate+' To ' + toDate+' | '+tts

        })
        document.getElementById('time-frame-select').addEventListener('change', function () { 
            let currency = document.getElementById('currency').value;
            fromDate = document.getElementById('from-date').value;
            toDate = document.getElementById('to-date').value;
            var tts = document.getElementById('transaction-type-select').value;
            var timeFrame = document.getElementById('time-frame-select').value;
            

            collectedData.innerHTML = currency+' | '+fromDate+' To ' + toDate+' | '+ tts +' | '+timeFrame

            

        })
        document.getElementById('interval-select').addEventListener('change', function () { 
            let currency = document.getElementById('currency').value;
            fromDate = document.getElementById('from-date').value;
            toDate = document.getElementById('to-date').value;
            var tts = document.getElementById('transaction-type-select').value;
            var timeFrame = document.getElementById('time-frame-select').value;
            var interVal = document.getElementById('interval-select').value;
            var downloadBtn = document.getElementById('download-btn');
            downloadBtn.disabled = false;
            collectedData.innerHTML = currency+' | '+fromDate+' To ' + toDate+' | '+ tts +' | '+timeFrame+' | '+interVal
            downloadBtn.innerHTML = 'Collect Your Data'
            collectedData.style.backgroundColor = '#03a741'
            collectedData.style.color = '#fff'
           //  document.getElementById('interval-select').style.display = 'none';
            // var backgroundImage = `url('../Coin\ Traiding/src/img/BG_Step 005.png')`;
            // document.body.style.backgroundImage = backgroundImage;


        })



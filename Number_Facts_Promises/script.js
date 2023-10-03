// Part 1: Number Facts with Promises

// Single number fact
const singleNumberFact = (number) => {
    fetch(`http://numbersapi.com/${number}?json`)
      .then(response => response.json())
      .then(data => {
        if (data.text) {
            displayFactOnPage(data.text);
        } else {
            console.error(`No fact available for number: ${number}`);
        }
    })
  };
  
  // Multiple number facts
  const multipleNumberFacts = (numbers) => {
    fetch(`http://numbersapi.com/${numbers.join(',')}?json`)
      .then(response => response.json())
      .then(data => {
        for (let num in data) {
          if (data[num].text) {  // Check if the text is defined
            displayFactOnPage(data[num].text);  // or console.log(data[num].text);
          } else {
            console.error(`No fact available for number: ${num}`);
          }
        }
      })
      .catch(error => {
        console.error("Error fetching the number facts:", error);
      });
};

  // Four facts about a single number
  const fourFactsAboutNumber = (number) => {
    let promises = [];
  
    for (let i = 0; i < 4; i++) {
      promises.push(fetch(`http://numbersapi.com/${number}?json`));
    }
  
    Promise.all(promises)
      .then(responses => Promise.all(responses.map(r => r.json())))
      .then(facts => {
        facts.forEach(fact => {
          displayFactOnPage(fact.text);
        });
      })
      .catch(error => {
        console.error("Error fetching the four facts:", error);
      });
  };
  
  function displayFactOnPage(fact) {
    const p = document.createElement("p");
    p.textContent = fact;
    document.body.appendChild(p);
  }
  
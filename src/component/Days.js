import React from 'react';
import '../index.css';
import '../App.css';

function Days(props) {

    function handleClick(e) {
        let bold = document.querySelectorAll('a');
        bold.forEach(element => {
            element.style.fontWeight = 'normal'
        });
        e.target.style.fontWeight = "bold"
        e.preventDefault();
        props.changeDay(e.target.getAttribute('data-time'))
    }

    const Jour = new Date(props.date * 1000);

    const day = (new Intl.DateTimeFormat('en-EN', { weekday: 'long'})).format(Jour);

    function displayDays(){

        if (props.nextDays.length > 0) {
            console.log(props);
          return props.nextDays.map((element)=>{
            let dayUp = (new Intl.DateTimeFormat('en-EN', { weekday: 'long'}).format(new Date(element * 1000)));    
            return (<a onClick={handleClick} data-time={element} href="#">{dayUp}</a>)
          })
        }
      }

    return (
        <div className="App">
            <div className="row">
                <div className="col s12 m6 push-m3">
                    <div className="weather card blue-grey darken-1">
                        <div className="card-action">
                            <a onClick={handleClick} data-time={props.date} href="#">{day}</a>
                                {displayDays()}

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

};

      export default Days;
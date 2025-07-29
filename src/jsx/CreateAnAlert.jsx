import '../css/CreateAnAlert.css'

function CreateAnAlert() {
    return (
        <>
            <div className="header-container">
                {/*  <img src={Logo} className="logo" alt="Amber Alert logo" /> */}
                <h1 className="header-container">
                    Create An Alert
                </h1>


            </div>

            <div className="body-container">



                <label className="name-label">Name Of Missing Person</label>
                <input type = "text" className="name-input" defaultValue=""/>

                <label className="time-label">Time Of Missing Disappearance</label>
                <TimePicker label="time of disappearance" value = {value} onChange={(newValue) => setValue(newValue)} />
                <label className="description-label">Description of Person and Situation</label>
                <input type="text" className="description-input" defaultValue=""/>

                <label className="image-label">Image of person</label>
                <input type="image" className="name-input"/>

                <button> Post This Alert</button>
                <button> Clear All Fields</button>
                <button> Return to Home</button>

            </div>

        </>
    )
}

export default CreateAnAlert



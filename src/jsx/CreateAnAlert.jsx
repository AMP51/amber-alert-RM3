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
                {/* <TimePicker className="time-input" label="time of disappearance" value = {value} onChange={(newValue) => setValue(newValue)} />*/}
                <label className="description-label">Description of Person and Situation</label>
                <input type="text" className="description-input" defaultValue=""/>

                <label className="image-label">Image of person</label>
                <input type="image" className="image-input"/>

                <button className="post-alert-button"> Post This Alert</button>
                <button className="clear-fields-button"> Clear All Fields</button>
                <button className="return-home-button"> Return to Home</button>

            </div>

        </>
    )
}

export default CreateAnAlert



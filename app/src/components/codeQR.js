import React, { useState } from "react";
import QRCode from "react-qr-code";
import { regexLien } from "../assets/regex";
function CodeQR() {
    const [linkOriginal, setLinkOriginal] = useState("");
    const [color, setColor] = useState("#000000")
    const [codeQR, setCodeQR] = useState(null)
    const [isValid, setIsValid] = useState(true)

    const onSubmit = (e)=>{
        e.preventDefault();
        setCodeQR(null)
        setCodeQR(linkOriginal);
    }
    const onChangeLinkOriginal = (e)=>{
        setLinkOriginal(e.target.value)
        if(!regexLien.test(e.target.value) || e.target.value == ""){
            setIsValid(false)
        }else{
            setIsValid(true)
        }
    }
    const onChangeColor = (e)=>{
        setColor(e.target.value)
    }
    return (
        <>
            <form onSubmit={onSubmit}>
                <div class="mb-3 row">
                    <label for="inputPassword" class="col-sm-3 col-form-label">Lien original*</label>
                    <div class="col-sm-8">
                    <input type="link" className="form-control" id="inputPassword"     style={{ borderColor: isValid ? "white" : "red", color: isValid ? "black" : "red" }} onChange={onChangeLinkOriginal} value={linkOriginal} required/>
                        <div className="invalid-feedback" style={{display: isValid ? 'none' : 'block'}}>Lien invalid</div>
                    </div>
                </div>

                <div class="d-grid gap-2 d-md-flex mx-auto justify-content-md-end">
                    <button class="btn btn-outline-light" type="submit" style={{ width: "200px" }} disabled={!isValid}>Valider</button>
                </div>


            </form>
            <div class="mb-3 row">
                <div style={{ display: 'flex' }}>
                    <label for="inputPassword" class="col-sm-2 col-form-label">Voici le code QR </label>
                    <input type="color" className="form-control form-control-color" id="exampleColorInput" value={color} onChange={onChangeColor} title="Choose your color" />
                </div>
                {
                    codeQR == null ? <></> : <QRCode value={codeQR} bgColor="white" fgColor={color} />
                }
            </div>
        </>
    )
}

export default CodeQR;
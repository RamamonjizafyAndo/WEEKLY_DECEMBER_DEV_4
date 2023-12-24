import React, { useState } from "react";
import axios from 'axios';
import { regexLien } from "../assets/regex";
function ShortLink() {
    const [linkOriginal, setLinkOriginal] = useState('');
    const [href, setHref] = useState('');
    const [shortLink, setShortLink] = useState('');
    const [copy, setCopy] = useState(false)
    const [isValid, setIsValid] = useState(true)
    const onSubmit = (e) => {
        e.preventDefault();
        setShortLink('');
        setCopy(false);
        axios.post('http://localhost:4000/shorten', {
            longUrl: linkOriginal,
            add: href
        })
            .then(response => {
                setShortLink(response.data)
            })
            .catch(error => {
                console.error('Error making request:', error);
            });
    }
    const copyToClipboard = () => {
        navigator.clipboard.writeText(shortLink).then(() => {
            setCopy(true)
        }).catch(err => {
            console.log(err);
            setCopy(false)
        });
    };
    const onChangeLinkOriginal = (e) => {
        setLinkOriginal(e.target.value)
        if(!regexLien.test(e.target.value) || e.target.value == ""){
            setIsValid(false)
        }else{
            setIsValid(true)
        }
            
        
        
    }
    const onChangeHref = (e) => {
        setHref(e.target.value)
    }
    return (
        <>
            <form onSubmit={onSubmit}>
                <div className="mb-3 row">
                    <label for="inputPassword" className="col-sm-3 col-form-label">Lien original*</label>
                    <div className="col-sm-8">
                        <input type="link" className="form-control" id="inputPassword"     style={{ borderColor: isValid ? "white" : "red", color: isValid ? "black" : "red" }} onChange={onChangeLinkOriginal} value={linkOriginal} required/>
                        <div className="invalid-feedback" style={{display: isValid ? 'none' : 'block'}}>Lien invalid</div>
                    </div>
                </div>
                <div className="mb-3 row">
                    <label for="inputPassword" className="col-sm-3 col-form-label">href</label>
                    <div className="col-sm-8">
                        <input type="text" className="form-control" id="inputPassword" onChange={onChangeHref} value={href} />
                    </div>
                </div>
                <div className="mb-3 row">
                    <label for="shortLink" className="col-sm-3 col-form-label">Lien raccourci</label>
                    <div className="col-sm-7">
                        <input className="form-control" type="text" id="shortLink" value={shortLink} aria-label="Disabled input example" disabled readonly />
                    </div>
                    <div className="col-sm-1">
                        <button type="button" className="btn btn-outline-light" onClick={copyToClipboard}>
                            {
                                !copy ? <i className="bi bi-clipboard"></i> : <i className="bi bi-clipboard-check-fill"></i>
                            }

                        </button>
                    </div>
                </div>
                <div className="d-grid gap-2 d-md-flex mx-auto justify-content-md-end">
                    <button className="btn btn-outline-light" type="submit" style={{ width: "200px" }} disabled={!isValid}>Valider</button>
                </div>
            </form>
        </>
    )
}

export default ShortLink;

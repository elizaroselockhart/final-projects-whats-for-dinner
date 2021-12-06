import api from "../api/api-actions";
import * as CONSTANTS from "./constants";

export default {
    DisplayAllTags,
    SetupTagDeleteBtn
}

function DisplayAllTags(tags) {
    return `
        <ol> 
            ${tags.map(tag => {
                return `
                    <li class='addedTags'>
                        <h5>
                            <span>
                                ${tag.name}
                                <button id='${tag.id}' class='btnDeleteTag'>Delete</button>
                            </span>
                        </h5>
                    </li>
                `;
            }).join('')}
        </ol>
    `;
}

function SetupTagDeleteBtn() {
    let btnDeleteTags = document.querySelectorAll('btnDeleteTag');
    btnDeleteTags.forEach(btnDeleteTag => {
        btnDeleteTag.addEventListener('click', function(evt) {
            console.log("Delete tag button clicked!");
            let tagId = evt.target.id;
            api.deleteRequest(CONSTANTS.TagsAPIURL, tagId, tags => {
                DisplayAllTags(tags);
                SetupTagDeleteBtn();
            })
        })
    })
}
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'customformat',
  standalone: true,
})
export class CustomformatPipe implements PipeTransform {
  transform(value: any, ...args: unknown[]): unknown {
    // if (!value) {
    //   return value;
    // }

// Create a temporary container to hold the HTML string

const container = document.createElement('div');
container.id = "content";
container.innerHTML = value;

// Get all the <p> elements
const paragraphs = container.querySelectorAll('p');

// Create a new <div> with class 'program' to wrap the code block
let programDiv = document.createElement('div');
programDiv.className = 'program';
// programDiv.style.backgroundColor = 'wheat';  // Set background color
// programDiv.style.border = '1px solid gray';     // Add border
// programDiv.style.padding = '20px';               // Add padding
// programDiv.style.color = 'black';  

 let finalString = '';
// let insideCodeBlock = false;



// Iterate through the paragraphs
console.log('paragraphs');
console.log(paragraphs)
paragraphs.forEach((paragraph,index:any) => {
  console.log('each element');
  console.log(paragraph.outerHTML);

  if(paragraph.outerHTML === '<p></p>') {
    // programDiv = document.createElement('div');
    // programDiv.className = 'empty';
    console.log('paragraph empty');
  } else  if(paragraph.innerHTML.includes('<code>') ) {         
    programDiv.appendChild(paragraph);
  } else {
     programDiv = document.createElement('div');
     programDiv.className = 'paragraph';
     programDiv.appendChild(paragraph)
  }
  console.log(programDiv);
  console.log(paragraph);

});

   finalString += programDiv.outerHTML;


   console.log(programDiv);
   console.log(finalString); 

    return finalString;

  }
}



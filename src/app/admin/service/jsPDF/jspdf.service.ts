import { Injectable } from '@angular/core';
import jsPDF from 'jspdf';

@Injectable({
  providedIn: 'root'
})
export class JspdfService {

  constructor() { }

  generatePdf(element: HTMLElement, fileName: string): void {
    const pdf = new jsPDF({
      orientation: 'p',
      unit: 'pt',
      format: 'a4',
      compress: true,
    });

    pdf.html(element, {
      callback: (pdf) => {
        pdf.save(fileName);
      },
      margin: [10, 10, 10, 10],
      autoPaging: 'text',
      width: 575,
      windowWidth: 1000,
      filename: fileName,
      image: {
        type: 'png',
        quality: 0.1,
      },
      fontFaces: [
        {
          family: 'Open Sans',
          style: 'normal',
          weight: 400,
          src: [
            {
              url: '../../../../assets/fonts/OpenSans-Regular.ttf',
              format: 'truetype',
            },
          ],
        },
        {
          family: 'Open Sans',
          style: 'normal',
          weight: 700,
          src: [
            {
              url: '../../../../assets/fonts/OpenSans-Bold.ttf',
              format: 'truetype',
            },
          ],
        },
      ],
    });
  }
}

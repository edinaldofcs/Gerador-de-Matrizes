class View {
  matrixRowsInput = document.getElementById("matrix-rows");
  matrixColsInput = document.getElementById("matrix-cols");
  matrixTable = document.getElementById("matrix-table");
  hideButton = document.getElementById("hide");
  openButton = document.getElementById("open");
  menu = document.getElementById("menu");
  saveButton = document.getElementById("save-button");
  initialRowValue = 20;
  initialColumnValue = 50;

  constructor() {
    this.painting = false;
    this.drawMatrix();
    this.setListeners();
    console.log(this.matrixRowsInput.value);
    this.initialRowValue = 20;
  }

  drawMatrix() {
    const numRows = this.initialRowValue;
    const numCols = this.initialColumnValue;

    this.matrixTable.innerHTML = "";

    for (let i = 0; i < numRows; i++) {
      const row = document.createElement("tr");
      for (let j = 0; j < numCols; j++) {
        const cell = document.createElement("td");
        cell.setAttribute("id", "cell");
        cell.textContent = `0`; // Exemplo de conteúdo da célula
        row.appendChild(cell);
      }
      this.matrixTable.appendChild(row);
    }

    const cells = document.querySelectorAll("#cell");
    cells[0].textContent = "3";
    cells[cells.length - 1].textContent = "4";

    cells.forEach((cell) => {
      cell.addEventListener("mousedown", () => {
        this.painting = true;
        this.paint(cell);
      });
      cell.addEventListener("mouseover", () => {
        this.paint(cell);
      });
      cell.addEventListener("mouseup", () => {
        this.painting = false;
      });
    });
  }

  paint(cell) {
    if (this.painting) {
      cell.classList.toggle("painting");

      if (cell.classList.contains("painting")) {
        cell.textContent = "1";
      } else {
        cell.textContent = "0";
      }
    }
  }

  setListeners() {
    this.hideButton.addEventListener("click", () => {
      this.openButton.style.display = "block";
      this.menu.style.display = "none";
    });

    this.openButton.addEventListener("click", () => {
      this.openButton.style.display = "none";
      this.menu.style.display = "block";
    });

    this.matrixRowsInput.addEventListener("input", (e) => {
      this.initialRowValue = e.target.value;
      this.drawMatrix();
    });

    // this.matrixRowsInput.addEventListener("input", this.drawMatrix);
    this.matrixColsInput.addEventListener("input", (e) => {
      this.initialColumnValue = e.target.value;
      this.drawMatrix();
    });

    this.saveButton.addEventListener("click", () =>
      this.generateTxt(this.initialRowValue, this.initialColumnValue)
    );
  }

  generateTxt(numRows, numCols) {
    {
      console.log(numRows);

      let matrixText = "";

      // Gere a matriz como uma string
      for (let i = 0; i < numRows; i++) {
        let rowText = "";
        for (let j = 0; j < numCols; j++) {
          if (i == 0 && j == 0) {
            rowText += "3";
            continue;
          }
          if (i == numRows - 1 && j == numCols - 1) {
            rowText += "4";
            continue;
          }
          const cell = this.matrixTable.rows[i].cells[j];
          rowText += cell.classList.contains("painting") ? "1" : "0";
        }
        matrixText += rowText + "\n";
      }

      // Crie um objeto Blob para armazenar os dados da matriz
      const blob = new Blob([matrixText], { type: "text/plain" });

      // Crie um objeto URL para o Blob e crie um link para baixá-lo
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "matrix.txt";
      link.click();

      // Limpe o objeto URL
      URL.revokeObjectURL(url);
    }
  }
}

const view = new View();

// const matrixRowsInput = document.getElementById("matrix-rows");
// const matrixColsInput = document.getElementById("matrix-cols");
// const matrixTable = document.getElementById("matrix-table");
// const hideButton = document.getElementById("hide");
// const openButton = document.getElementById("open");
// const menu = document.getElementById("menu");

// hideButton.addEventListener("click", () => {
//   openButton.style.display = "block";
//   menu.style.display = "none";
// });

// openButton.addEventListener("click", () => {
//   openButton.style.display = "none";
//   menu.style.display = "block";
// });

// let painting = false;

// function drawMatrix() {
//   const numRows = matrixRowsInput.valueAsNumber;
//   const numCols = matrixColsInput.valueAsNumber;
//   // Limpa a tabela existente (se houver)
//   matrixTable.innerHTML = "";

//   // Cria as células da tabela com base no número de linhas e colunas
//   for (let i = 0; i < numRows; i++) {
//     const row = document.createElement("tr");
//     for (let j = 0; j < numCols; j++) {
//       const cell = document.createElement("td");
//       cell.setAttribute("id", "cell");
//       cell.textContent = `0`; // Exemplo de conteúdo da célula
//       row.appendChild(cell);
//     }
//     matrixTable.appendChild(row);
//   }

//   const cells = document.querySelectorAll("#cell");
//   cells[0].textContent = "3";
//   cells[cells.length - 1].textContent = "4";

//   cells.forEach((cell) => {
//     cell.addEventListener("mousedown", () => {
//       painting = true;
//       draw(cell);
//     });
//     cell.addEventListener("mouseover", () => {
//       draw(cell);
//     });
//     cell.addEventListener("mouseup", () => {
//       painting = false;
//     });
//   });
// }

// function draw(cell) {
//   if (painting) {
//     cell.classList.toggle("blue");

//     if (cell.classList.contains("blue")) {
//       cell.textContent = "1";
//     } else {
//       cell.textContent = "0";
//     }
//   }
// }

// // Adiciona o evento input aos elementos de entrada number
// matrixRowsInput.addEventListener("input", drawMatrix);
// matrixColsInput.addEventListener("input", drawMatrix);

// // Desenha a matriz inicial
// drawMatrix();

// const saveButton = document.getElementById("save-button");

// // Adicione o evento click ao botão "Salvar"
// saveButton.addEventListener("click", () => {
//   const numRows = matrixTable.rows.length;
//   const numCols = matrixTable.rows[0].cells.length;
//   let matrixText = "";

//   // Gere a matriz como uma string
//   for (let i = 0; i < numRows; i++) {
//     let rowText = "";
//     for (let j = 0; j < numCols; j++) {
//       const cell = matrixTable.rows[i].cells[j];
//       rowText += cell.classList.contains("blue") ? "1" : "0";
//     }
//     matrixText += rowText + "\n";
//   }

//   // Crie um objeto Blob para armazenar os dados da matriz
//   const blob = new Blob([matrixText], { type: "text/plain" });

//   // Crie um objeto URL para o Blob e crie um link para baixá-lo
//   const url = URL.createObjectURL(blob);
//   const link = document.createElement("a");
//   link.href = url;
//   link.download = "matrix.txt";
//   link.click();

//   // Limpe o objeto URL
//   URL.revokeObjectURL(url);
// });

document.addEventListener("DOMContentLoaded", function () {
    const veiculos = [
        { marca: "Toyota", modelo: "Corolla", ano: 2020, preco: 90500, imagem: "PORTIFOLIO2.png" },
        { marca: "Volkswagen", modelo: "Voyage", ano: 2019, preco: 44500, imagem: "PORTIFOLIO2.png" },
        { marca: "Ford", modelo: "Fiesta", ano: 2021, preco: 55000, imagem: "PORTIFOLIO2.png" },
        { marca: "Chevrolet", modelo: "Onix", ano: 2018, preco: 40000, imagem: "PORTIFOLIO2.png" }
    ];

    const marcaSelect = document.getElementById("marca");
    const modeloSelect = document.getElementById("modelo");
    const anoSelect = document.getElementById("ano");
    const carrosContainer = document.getElementById("carros");

    // Preencher marcas
    const marcas = [...new Set(veiculos.map(veiculo => veiculo.marca))];
    marcas.forEach(marca => {
        const option = document.createElement("option");
        option.value = marca;
        option.textContent = marca;
        marcaSelect.appendChild(option);
    });

    // Atualizar modelos ao selecionar uma marca
    marcaSelect.addEventListener("change", function () {
        const selectedMarca = marcaSelect.value;
        modeloSelect.innerHTML = "<option value=''>Modelo</option>";
        if (selectedMarca) {
            const modelosFiltrados = veiculos.filter(veiculo => veiculo.marca === selectedMarca);
            modelosFiltrados.forEach(veiculo => {
                const option = document.createElement("option");
                option.value = veiculo.modelo;
                option.textContent = veiculo.modelo;
                modeloSelect.appendChild(option);
            });
        }
    });

    // Preencher anos
    const anoAtual = new Date().getFullYear();
    for (let i = anoAtual; i >= anoAtual - 10; i--) {
        const option = document.createElement("option");
        option.value = i;
        option.textContent = i;
        anoSelect.appendChild(option);
    }

    // Função de busca
    document.getElementById("searchForm").addEventListener("submit", function (event) {
        event.preventDefault();
        const marca = marcaSelect.value;
        const modelo = modeloSelect.value;
        const ano = anoSelect.value;

        const veiculosFiltrados = veiculos.filter(veiculo => {
            return (!marca || veiculo.marca === marca) &&
                   (!modelo || veiculo.modelo === modelo) &&
                   (!ano || veiculo.ano === parseInt(ano));
        });

        exibirVeiculos(veiculosFiltrados);
    });

    // Exibir veículos no carrossel
    function exibirVeiculos(veiculos) {
        carrosContainer.innerHTML = ""; // Limpar veículos antigos

        if (veiculos.length === 0) {
            carrosContainer.innerHTML = "<p>Nenhum veículo encontrado.</p>";
            return;
        }

        // Criar o carrossel
        const carrosselContainer = document.createElement("div");
        carrosselContainer.id = "carrossel-container";

        const carrosselImages = document.createElement("div");
        carrosselImages.className = "carrossel";

        veiculos.forEach(veiculo => {
            const imgElement = document.createElement("img");
            imgElement.src = veiculo.imagem;
            imgElement.alt = `${veiculo.marca} ${veiculo.modelo}`;
            carrosselImages.appendChild(imgElement);
        });

        carrosselContainer.appendChild(carrosselImages);
        carrosContainer.appendChild(carrosselContainer);

        // Adicionar navegação
        const prevButton = document.createElement("button");
        prevButton.id = "prev";
        prevButton.className = "navegacao";
        prevButton.textContent = "❮";
        carrosContainer.appendChild(prevButton);

        const nextButton = document.createElement("button");
        nextButton.id = "next";
        nextButton.className = "navegacao";
        nextButton.textContent = "❯";
        carrosContainer.appendChild(nextButton);

        // Carrossel logic
        let currentIndex = 0;
        function updateCarrossel() {
            carrosselImages.style.transform = `translateX(-${currentIndex * 100}%)`;
        }

        nextButton.addEventListener('click', function () {
            currentIndex = (currentIndex + 1) % veiculos.length;
            updateCarrossel();
        });

        prevButton.addEventListener('click', function () {
            currentIndex = (currentIndex - 1 + veiculos.length) % veiculos.length;
            updateCarrossel();
        });

        // Inicializar carrossel com a primeira imagem
        updateCarrossel();
    }

    // Exibir todos os veículos ao carregar a página
    exibirVeiculos(veiculos);
});

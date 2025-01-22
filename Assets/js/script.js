fetch(`https://world.openfoodfacts.org/api/v3/product/5997523311230`)
    .then(reponse => reponse.json())
    .then(data => {
        console.log(data);

        let bgColor = ""
        let nutriscoreImage = ""
        let qualityNutri = ""
        let colorText = ""

        switch (data.product.nutriscore_grade) {
            case "a":
                nutriscoreImage = "Assets/images/nutri/A.svg"
                bgColor = "bg-success-subtle"
                qualityNutri = "Trés bonne qualité nutritionnelle"
                colorText = "text-success"
                break;

            case "b":
                nutriscoreImage = "Assets/images/nutri/B.svg"
                bgColor = "bg-success-subtle"
                qualityNutri = "Bonne qualité nutritionnelle"
                colorText = "text-success"
                break;

            case "c":
                nutriscoreImage = "Assets/images/nutri/C.svg"
                bgColor = "bg-warning-subtle"
                qualityNutri = "Qualité nutritionnelle moyenne"
                colorText = "text-warning"
                break;

            case "d":
                nutriscoreImage = "Assets/images/nutri/D.svg"
                bgColor = "bg-warning-subtle"
                qualityNutri = "Moins bonne qualité nutritionnelle"
                colorText = "text-warning"
                break;

            case "e":
                nutriscoreImage = "Assets/images/nutri/E.svg"
                bgColor = "bg-danger-subtle"
                qualityNutri = "Moins bonne qualité nutritionnelle"
                colorText = "text-danger"
                break;

            default:
                nutriscoreImage = "Assets/images/nutri/IDK.svg"
                bgColor = "bg-secondary-subtle"
                qualityNutri = "Données nutrionelles manquantes"
                colorText = "text-secondary"
                break;
        }

        let bgColorNova = ""
        let novaImage = ""
        let colorTextNova = ""

        switch (data.product.nova_group) {
            case 1:
                bgColorNova = "bg-success-subtle"
                novaImage = "Assets/images/nova/Nova1.svg"
                colorTextNova = "text-success"
                break;

            case 2:

                bgColorNova = "bg-success-subtle"
                novaImage = "Assets/images/nova/Nova2.svg"
                colorTextNova = "text-success"
                break;

            case 3:

                bgColorNova = "bg-success-subtle"
                novaImage = "Assets/images/nova/Nova3.svg"
                colorTextNova = "text-success"
                break;

            case 4:

                bgColorNova = "bg-danger-subtle"
                novaImage = "Assets/images/nova/Nova4.svg"
                colorTextNova = "text-danger"
                break;

            default:
                bgColorNova = "bg-secondary-subtle"
                novaImage = "Assets/images/nova/NovaIDK.svg"
                colorTextNova = "text-secondary"
                break;
        }

        switch (data.product.ecoscore_grade) {
            case "a":

                break;

            case "b":

                break;

            case "c":

                break;

            case "d":

                break;

            case "e":

                break;

            case "f":

                break;

            default:
                break;
        }

        document.getElementById("product").innerHTML = `
        <img class="col-lg-4 bg-white"
            src="${data.product.selected_images.front.display.fr}" alt="Image de ${data.product.product_name_fr}">
        <!-- selected_images => front => display => fr -->
        <div class="col-lg-8 bg-white">
            <h2>${data.product.product_name_fr}-<span class="text-uppercase">${data.product.brands}</span>-${data.product.quantity}</h2>
            <!-- product_name_fr-brands-product_quantity + quantity(product_quantity_unit) -->
            <div>
                <p class="m-0"><span class="fw-bold">Code-barres</span> :</p>
                <p class="m-0">${data.code}</p>
                <!-- code -->
            </div>

            <p class="mt-3"><span class="fw-bold">Conditionnement </span> : ${data.product.packaging} </p>
            <!-- packaging => packagings => material [0].split(":")[1]-->

            <p class="mt-3"><span class="fw-bold">Marques </span> : ${data.product.brands}</p>
            <!-- brands -->

            <p class="mt-3"><span class="fw-bold">Catégories </span> : ${data.product.categories}</p>
            <!-- categories -->

            <p class="mt-3"><span class="fw-bold">Lieux de fabrication ou de transformation </span> : ${data.product.manufacturing_places}</p>
            <!-- manufacturing_places -->

            <p class="mt-3"><span class="fw-bold">Magasins </span> : ${data.product.stores}</p>
            <!-- stores_tags -->

            <p class="mt-3"><span class="fw-bold">Pays de vente </span> : ${data.product.countries}</p>
            <!-- countries_hierarchy -->
        </div>

        <div class="bg-white mx-0 mt-4 row p-3" id="score">
            <h2>Correspondance avec vos préférences</h2>

            <div class="d-flex justify-content-between">
                <div class="row col-lg-4 py-3 border rounded m-0 carte ${bgColor}">
                    <div class="col-lg-4">
                        <img class="img-fluid"
                            src="${nutriscoreImage}"
                            alt="Nutri-Score D">
                    </div>
                    <div class="col-lg-8  nutriscore">
                        <p class="fs-6 orange fw-bold ${colorText}">Nutri-Score <span class="text-uppercase">${data.product.nutrition_grade_fr}</span></p>
                        <p>${qualityNutri}</p>
                    </div>
                    <!--2023 - grade = d -->
                </div>

                <div class="row col-lg-4 py-3 border rounded m-0 carte ${bgColorNova}">
                    <div class="col-lg-2">
                        <img class="img-fluid"
                            src="${novaImage}"
                            alt="Nutri-Score D">
                            <!-- nova_group -->
                    </div>
                    <div class="col-lg-8 nutriscore">
                        <p class="fs-6 fw-bold ${colorTextNova}">Aliments ultra-transformés</p>
                        <p>${data.product.nova_groups_markers[4].length} marqueurs d'ultra-transfomation</p>
                    </div>
                    <!--2023 - grade = d -->
                </div>

                <div class="row col-lg-4 py-3 border rounded bg-warning-subtle m-0 carte">
                    <div class="col-lg-5">
                        <img class="img-fluid"
                            src="https://static.openfoodfacts.org/images/attributes/dist/green-score-c.svg"
                            alt="green-score-c">
                            <!-- grade -->
                    </div>
                    <div class="col-lg-7 nutriscore">
                        <p class="fs-6 text-warning fw-bold">Green-Score <span class="text-uppercase">${data.product.ecoscore_grade}</span></p>
                        <p>Impact modéré sur l'environnement</p>
                    </div>
                    <!--2023 - grade = d -->
                </div>
            </div>
        </div>
        `

    })
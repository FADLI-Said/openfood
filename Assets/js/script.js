let urlParams = new URLSearchParams(window.location.search);
item_code = urlParams.get("barCode")

if (item_code == null || item_code == "") {
    item_code = `5997523311230`
  }
  

fetch(`https://world.openfoodfacts.org/api/v3/product/${item_code}`)
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
        let transformed = ""

        switch (data.product.nova_group) {
            case 1:
                bgColorNova = "bg-success-subtle"
                novaImage = "Assets/images/nova/Nova1.svg"
                colorTextNova = "text-success"
                transformed = "Aliments non transformés ou minimalement transformés"
                break;

            case 2:

                bgColorNova = "bg-success-subtle"
                novaImage = "Assets/images/nova/Nova2.svg"
                colorTextNova = "text-success"
                transformed = "Ingrédients culinaires transformés"
                break;

            case 3:

                bgColorNova = "bg-success-subtle"
                novaImage = "Assets/images/nova/Nova3.svg"
                colorTextNova = "text-success"
                transformed = "Aliments transformés"
                break;

            case 4:

                bgColorNova = "bg-danger-subtle"
                novaImage = "Assets/images/nova/Nova4.svg"
                colorTextNova = "text-danger"
                transformed = "Aliments ultra-transformés"
                break;

            default:
                bgColorNova = "bg-secondary-subtle"
                novaImage = "Assets/images/nova/NovaIDK.svg"
                colorTextNova = "text-secondary"
                transformed = "NOVA non calculé"
                break;
        }

        let greenScoreImage = ""
        let ecoText = ""
        let greenScoreColor = ""
        let bgColorGreen = ""

        switch (data.product.ecoscore_grade) {
            case "a":
                greenScoreImage = "Assets/images/Green/green-score-a.svg"
                ecoText = "Très faible impact environnemental"
                greenScoreColor = "text-success"
                bgColorGreen = "bg-success-subtle"
                break;

            case "b":
                greenScoreImage = "Assets/images/Green/green-score-b.svg"
                ecoText = "Faible impact environnemental"
                greenScoreColor = "text-success"
                bgColorGreen = "bg-success-subtle"
                break;

            case "c":
                greenScoreImage = "Assets/images/Green/green-score-c.svg"
                ecoText = "Impact modéré sur l'environnement"
                greenScoreColor = "text-warning"
                bgColorGreen = "bg-warning-subtle"
                break;

            case "d":
                greenScoreImage = "Assets/images/Green/green-score-d.svg"
                ecoText = "Impact environnemental élevé"
                greenScoreColor = "text-warning"
                bgColorGreen = "bg-warning-subtle"
                break;

            case "e":
                greenScoreImage = "Assets/images/Green/green-score-e.svg"
                ecoText = "Impact environnemental très élevé"
                greenScoreColor = "text-danger"
                bgColorGreen = "bg-danger-subtle"
                break;

            case "f":
                greenScoreImage = "Assets/images/Green/green-score-f.svg"
                ecoText = "Impact environnemental très élevé"
                greenScoreColor = "text-danger"
                bgColorGreen = "bg-danger-subtle"
                break;

            default:
                greenScoreImage = "Assets/images/Green/green-score-not-applicable.svg"
                ecoText = "Non applicable pour la catégorie : Eaux"
                greenScoreColor = "text-secondary"
                bgColorGreen = "bg-secondary-subtle"
                break;
        }

        document.getElementById("product").innerHTML = `
        <img class="col-lg-4 bg-white"
            src="${data.product.selected_images.front.display.fr}" alt="Image de ${data.product.product_name_fr}">
        <!-- selected_images => front => display => fr -->
        <div class="col-lg-8 bg-white">
            <h2>${data.product.product_name_fr} - <span class="text-uppercase">${data.product.brands}</span> - ${data.product.quantity}</h2>
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

            <div class="d-lg-flex justify-content-between">
                <div class="row col-lg-4 py-3 border rounded m-0 carte ${bgColor}">
                    <div class="col-lg-4">
                        <img class="img-fluid"
                            src="${nutriscoreImage}"
                            alt="Nutri-Score D">
                    </div>
                    <div class="col-lg-8  nutriscore">
                        <p class="fs-6 orange fw-bold ${colorText}">Nutri-Score <span class="text-uppercase">${data.product.nutriscore_grade == "unknown" ? "Inconnu": data.product.nutriscore_grade}</span></p>
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
                        <p class="fs-6 fw-bold ${colorTextNova}">${transformed}</p>
                        <p>${data.product.nova_groups_markers == null ? "" : data.product.nova_groups_markers[4].length + " marqueurs d'ultra-transformation"} </p>
                    </div>
                    <!--2023 - grade = d -->
                </div>


                <div class="row col-lg-4 py-3 border rounded m-0 carte ${bgColorGreen} ">
                    <div class="col-lg-5">
                        <img class="img-fluid"
                            src="${greenScoreImage}"
                            alt="green-score-c">
                            <!-- grade -->
                    </div>
                    <div class="col-lg-7 nutriscore">
                        <p class="fs-6 fw-bold ${greenScoreColor}">Green-Score <span class="text-uppercase">${data.product.ecoscore_grade == "unknown" ? "inconnu": data.product.ecoscore_grade}</span></p>
                        <p>${ecoText}</p>
                    </div>
                    <!--2023 - grade = d -->
                </div>
            </div>
        </div>
        `          
    })

    document.querySelector("#scan_button").addEventListener("click", function () {
        let selectedDeviceId;
        // document.querySelector("#video_container").classList.remove('visually-hidden')
        const codeReader = new ZXing.BrowserMultiFormatReader();
        console.log("ZXing code reader initialized");
        codeReader
          .listVideoInputDevices()
          .then((videoInputDevices) => {
            const sourceSelect = document.getElementById("sourceSelect");
            selectedDeviceId = videoInputDevices[0].deviceId;
            if (videoInputDevices.length >= 1) {
              videoInputDevices.forEach((element) => {
                const sourceOption = document.createElement("option");
                sourceOption.text = element.label;
                sourceOption.value = element.deviceId;
                sourceSelect.appendChild(sourceOption);
              });
              sourceSelect.onchange = () => {
                selectedDeviceId = sourceSelect.value;
              };
      
              const sourceSelectPanel = document.getElementById("sourceSelectPanel");
              sourceSelectPanel.style.display = "block";
              const video_container = document.querySelector("#video_container");
              video_container.style.display = "block";
              document.querySelector("#button_container").style.display = "block";
            }
            document.getElementById("startButton").addEventListener("click", () => {
              codeReader.decodeFromVideoDevice(
                selectedDeviceId,
                "video",
                (result, err) => {
                  if (result) {
                    
                    console.log(result);
                    document.getElementById("result").textContent = result.text;
                      document.querySelector("#search_content").value = result.text;
                      
                    const son = new Audio();
                    son.src = "../../bip_sound.mp3";
                    son.play().then(() => {
                      setTimeout(() => {
                      document.getElementById("search_button").click()
                    }, "1000");
                      
                    })
                    
                  }
                  if (err && !(err instanceof ZXing.NotFoundException)) {
                    console.error(err);
                    document.getElementById("result").textContent = err;
                  }
                }
              );
      
              console.log(
                `Started continous decode from camera with id ${selectedDeviceId}`
              );
            });
            document.getElementById("resetButton").addEventListener("click", () => {
              codeReader.reset();
              document.getElementById("result").textContent = "";
              console.log("Reset.");
            });
          })
          .catch((err) => {
            console.error(err);
          });
      });
      
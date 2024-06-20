const loadData = async (isShowAll) => {
  const res = await fetch("https://openapi.programming-hero.com/api/ai/tools");
  const data = await res.json();
  const tools = data.data.tools;
  displayData(tools, isShowAll);
};

const displayData = (tools, isShowAll) => {
  //   get tools container
  const toolsContainer = document.getElementById("tools-container");
  toolsContainer.textContent = "";

  // show all login for 6 item

  const showAll = document.getElementById("show-all-btn");
  if (tools.length > 6 && !isShowAll) {
    showAll.classList.remove("hidden");
  } else {
    showAll.classList.add("hidden");
  }
  //   show 6 item first
  if (!isShowAll) {
    tools = tools.slice(0, 6);
  }

  tools.forEach((tool) => {
    const toolsDiv = document.createElement("div");
    toolsDiv.classList = "card card-compact bg-base-100 border";
    toolsDiv.innerHTML = `
            <figure class="p-[25px]">
                <img class="rounded-2xl" src="${tool.image}" />
            </figure>
            <div class="p-[25px]">
                <h2 class="card-title text-[25px] font-semibold">Features</h2>
                <div class="mt-4 mb-6 text-base font-normal text-[#585858]">
                    <p>1. ${tool.features[0]}</p>
                    <p>2. ${tool.features[1]}</p>
                    <p>3. ${tool.features[2]}</p>
                </div>
                <hr />
                <div class="flex justify-between items-center mt-6">
                    <div>
                        <h2 class="card-title text-[25px] font-semibold mb-4">
                            ${tool.name}
                        </h2>
                        <p class="text-4 font-medium text-[#585858]">
                            <i class="fa-solid fa-calendar-days"></i> ${tool.published_in}
                        </p>
                    </div>
                    <div class="card-actions justify-end">
                        <button onclick="handleItemDetails('${tool.id}')" class="btn bg-[#FEF7F7] rounded-full">
                            <i class="fa-solid fa-arrow-right"></i>
                        </button>
                    </div>
                </div>
            </div>

      `;
    toolsContainer.appendChild(toolsDiv);

    // console.log(tool);
  });
};

// handle item details
const handleItemDetails = async (id) => {
  // console.log(id);
  const res = await fetch(
    `https://openapi.programming-hero.com/api/ai/tool/${id}`
  );
  const data = await res.json();
  const item = data.data;
  showItemDetails(item);
};

// show item details
const showItemDetails = (item) => {
  // console.log(item);
  const modalContent = document.getElementById("modal-content");
  modalContent.innerHTML = `
    <div class='flex flex-col lg:flex-row gap-5'>
      <div class='flex-1 border p-8 rounded-2xl bg-[#EB57570D]'>
        <h3 class='text-2xl font-semibold'>${item.description}</h3>
          <div class="flex flex-col lg:flex-row justify-between gap-4">
            <div class='p-6 bg-white rounded-2xl text-center text-[#03A30A] font-extrabold'>${item?.pricing[0]?.price} <br> ${item?.pricing[0]?.plan}</div>
            <div class='p-6 bg-white rounded-2xl text-center text-[#F28927] font-extrabold'>${item?.pricing[1]?.price} <br> ${item?.pricing[1]?.plan}</div>
            <div class='p-6 bg-white rounded-2xl text-center text-[#EB5757] font-extrabold'>${item?.pricing[2]?.price} <br> ${item?.pricing[2]?.plan}</div>
            
          </div>
        <div class="flex justify-between">
          <div>
            <h3 class='text-2xl font-semibold'>Features</h3>
            <li>${item.features[1].feature_name}</li>
            <li>${item.features[2].feature_name}</li>
            <li>${item.features[3].feature_name}</li>
            </div>
            <div>
            <h3 class='text-2xl font-semibold'>Integrations</h3>
            <li>${item?.integrations[0]}</li>
            <li>${item?.integrations[1]}</li>
            <li>${item?.integrations[2]}</li>
            <li>${item?.integrations[3]}</li>
            <li>${item?.integrations[4]}</li>

          </div>
        </div>
      </div>

      <div class='flex-1 border p-8 rounded-2xl'>
        <img class='rounded-2xl' src="${item.image_link[0]}" alt="">
        <h3 class='text-center text-2xl font-semibold mt-6 mb-4'>${item.input_output_examples[0].input}</h3>
        <h3 class='text-center text-base font-normal'>${item.input_output_examples[0].output}</h3>
      </div>

    </div>
            <div class="modal-action">
              <form method="dialog">
                <!-- if there is a button in form, it will close the modal -->
                <button class="btn">Close</button>
              </form>
            </div>
  `;

  // show modal
  featured_modal.showModal();
};

const showMoreHandler = () => {
  loadData(true);
};

loadData();

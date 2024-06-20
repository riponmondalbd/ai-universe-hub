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
  //   show all logic implement
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
                        <button class="btn bg-[#FEF7F7] rounded-full">
                            <i class="fa-solid fa-arrow-right"></i>
                        </button>
                    </div>
                </div>
            </div>

      `;
    toolsContainer.appendChild(toolsDiv);

    console.log(tool);
  });
};

const showMoreHandler = () => {
  loadData(true);
};

loadData();

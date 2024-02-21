const data = {
  services: [
    {
      id: 1,
      head: null,
      name: "Проф.осмотр",
      node: 0,
      price: 100.0,
      sorthead: 20,
    },
    {
      id: 2,
      head: null,
      name: "Хирургия",
      node: 1,
      price: 0.0,
      sorthead: 10,
    },
    {
      id: 3,
      head: 2,
      name: "Удаление зубов",
      node: 1,
      price: 0.0,
      sorthead: 10,
    },
    {
      id: 4,
      head: 3,
      name: "Удаление зуба",
      node: 0,
      price: 800.0,
      sorthead: 10,
    },
    {
      id: 5,
      head: 3,
      name: "Удаление 8ого зуба",
      node: 0,
      price: 1000.0,
      sorthead: 30,
    },
    {
      id: 6,
      head: 3,
      name: "Удаление осколка зуба",
      node: 0,
      price: 2000.0,
      sorthead: 20,
    },
    {
      id: 7,
      head: 2,
      name: "Хирургические вмешательство",
      node: 0,
      price: 200.0,
      sorthead: 10,
    },
    {
      id: 8,
      head: 2,
      name: "Имплантация зубов",
      node: 1,
      price: 0.0,
      sorthead: 20,
    },
    {
      id: 9,
      head: 8,
      name: "Коронка",
      node: 0,
      price: 3000.0,
      sorthead: 10,
    },
    {
      id: 10,
      head: 8,
      name: "Слепок челюсти",
      node: 0,
      price: 500.0,
      sorthead: 20,
    },
  ],
};

const listBlock = document.querySelector(".list");

const listProps = {
  shift: 30,
  elementClassName: "unit",
  elementBodyClassName: "unit__body",
  nodeClassName: "node",
  nodeListClassName: "node-list",
  nodeListClassNameToggle: "node-list_toggled",
};

const sortData = (
  data,
  parent,
  listProps,
  iter = 0,
  head = null,
) => {
  const createNode = (nodeProps, parent) => {
    const node = document.createElement("div");
    const nodeBody = document.createElement("div");
    const span = document.createElement("span");
    const nodeBefore = document.createElement("div");
    //
    node.classList.add(listProps.elementClassName);
    nodeBody.classList.add(listProps.elementBodyClassName);

    //add classes depending on list or node
    if (nodeProps.node) {
      node.classList.add(listProps.nodeListClassName);
      nodeBefore.classList.add("arrow");
    } else {
      node.classList.add(listProps.nodeClassName);
      nodeBefore.classList.add("marker");
    }

    //e.listener for toggle or redirect
    node.addEventListener("click", function (e) {
      e.stopPropagation();
      if (this.classList.contains(listProps.nodeListClassName))
        this.classList.toggle(listProps.nodeListClassNameToggle);
      else window.location.href = "/";
    });

    //append
    span.innerHTML = nodeProps.name;
    if (iter !== 0) node.style.marginLeft = listProps.shift + "px";
    node.appendChild(nodeBody);
    nodeBody.appendChild(nodeBefore);
    nodeBody.appendChild(span);
    parent.appendChild(node);
    return node;
  };

  const findElemsByHead = (data, head) => {
    return data.filter((el) => el.head === head);
  };

  findElemsByHead(data, head)
    .sort((a, b) => {
      return a.sorthead - b.sorthead;
    })
    .forEach((element) => {
        sortData(
          data,
          createNode(element, parent),
          listProps,
          iter + 1,
          element.id
        );
    });
};

sortData(data.services, listBlock, listProps);

class Lists {
  constructor(list) {
    this.list = list;
  }

  //funcao fetch item and return it/feito
  fetchItems() {
    return this.list;
  }
  //funcao adicionar valores na lista/feito
  addItem(item) {
    return (this.list = [...this.list, item]);
  }

  //function remover
  removeItem(itemId) {
    this.list = this.list.filter((list) => list.id !== itemId);
  }
  //function updateItem atualiza um item
  updatedItem(id, property) {
    this.list = this.list.map((element) => {
      if (element.id === id) {
        return { ...element, ...property };
      }
      return this.list;
    });
  }
  //function clearList
  //function clearList
  clearList() {
    return (this.list = []);
  }
}

//const lists = new Lists({});

module.exports = Lists;

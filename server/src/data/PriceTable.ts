export interface CallDetails {
  from: number,
  to: number,
  price: number
};

export interface Plan {
  name: string,
  value: number
};


export default class PriceTable {

  private priceList: CallDetails[] = [
    {
      from: 11,
      to: 16,
      price: 1.90
    },
    {
      from: 16,
      to: 11,
      price: 2.90
    },
    {
      from: 11,
      to: 17,
      price: 1.70
    },
    {
      from: 17,
      to: 11,
      price: 2.70
    },
    {
      from: 11,
      to: 18,
      price: 0.90
    },
    {
      from: 18,
      to: 11,
      price: 1.90
    }
  ]

  private planList: Plan[] = [
    {
      name: 'FaleMais 30',
      value: 30
    },
    {
      name: 'FaleMais 60',
      value: 60
    },
    {
      name: 'FaleMais 120',
      value: 120
    }
  ]


  public addPriceItem(from: number, to: number, price: number) {
    if (typeof from === "number" && typeof to === "number" && typeof price === "number") {
      this.priceList.push({ from, to, price })
    }

    return `Item adicionado. Novo total de ${this.priceList.length}`
  }

  public removePriceItem(from: number, to: number, price: number) {
    const previousLength = this.priceList.length
    this.priceList = this.priceList.filter(item => {
      return !(
        item.from === from && item.to === to && item.price === price
      )
    })

    return `${previousLength - this.priceList.length} itens removidos`
  }

  public getPrice(from: number, to: number): CallDetails {
    const item = this.priceList.find(item => item.from === from && item.to === to)

    return item
  }

  public getFromToList() {
    const fromList = this.priceList.map(item => {
      return item.from
    })

    const toList = this.priceList.map(item => {
      return item.to
    })

    return { fromList, toList }
  }

  public getPlanList() {
    return this.planList
  }

}


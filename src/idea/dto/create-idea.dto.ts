export class CreateIdeaDto {
  token: string;
  ideaInfo: {
    ideaId: number;
    ideaField: string;
    ideaName: string;
    ideaDetail: string;
    price: number;
    isTrading: boolean;
    postedUserId: number;
    purchasedUserId: number;
    bidUserId: number;
    count: number;
  };
  constructor() {
    this.token = '';
    this.ideaInfo = {
      ideaId: 0,
      ideaField: '',
      ideaName: '',
      ideaDetail: '',
      price: 0,
      isTrading: false,
      postedUserId: 0,
      purchasedUserId: 0,
      bidUserId: 0,
      count: 0,
    };
  }
}

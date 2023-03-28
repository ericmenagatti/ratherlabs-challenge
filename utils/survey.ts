import Web3 from 'web3';
import surveyAbi from '@/abi/survey.json';

const SURVEY_CONTRACT_ADDRESS = '0x437eF217203452317C3C955Cf282b1eE5F6aaF72';

export const SURVEY_SAMPLE = {
  title: "Sample Survey",
  image: "https://myklovr.com/wp-content/uploads/2018/08/survey-header.jpg",
  questions: [
    {
      text: "Question1",
      image: "https://interactive-examples.mdn.mozilla.net/media/cc0-images/grapefruit-slice-332-332.jpg",
      lifetimeSeconds: 10,
      options: [
        {
          text: "Opt1"
        },
        {
          text: "Opt2"
        },
        {
          text: "Opt"
        }
      ]
    },
    {
      text: "Question2",
      image: "https://filedn.com/ltOdFv1aqz1YIFhf4gTY8D7/ingus-info/BLOGS/Photography-stocks3/stock-photography-slider.jpg",
      lifetimeSeconds: 5,
      options: [
        {
          text: "Opt1"
        },
        {
          text: "Opt2"
        },
        {
          text: "Opt"
        }
      ]
    },
    {
      text: "Pregunta 2",
      image: "https://filedn.com/ltOdFv1aqz1YIFhf4gTY8D7/ingus-info/BLOGS/Photography-stocks3/stock-photography-slider.jpg",
      lifetimeSeconds: 5,
      options: [
        {
          text: "Opt1"
        },
        {
          text: "Opt2"
        },
        {
          text: "Opt"
        }
      ]
    }
  ]
}

export enum ESurveyStatus {
  AVAILABLE = 'available',
  STARTED = 'started',
  FINISHED = 'finished',
  ON_COOLDOWN = 'on_cooldown'
}

export interface ISurveyQuestionOptions {
  text: string;
}

export interface ISurveyQuestion {
  text: string;
  image: string;
  lifetimeSeconds: number;
  options: ISurveyQuestionOptions[];
}

export interface ISurvey {
  title: string;
  image: string;
  questions: ISurveyQuestion[];
}

export const onBalanceOf = async (account: string): Promise<string> => {
  try {
    const web3 = new Web3(Web3.givenProvider);
    const surveyContract = new web3.eth.Contract(surveyAbi.abi as any, SURVEY_CONTRACT_ADDRESS);

    const balance = await surveyContract.methods.balanceOf(account).call();

    return web3.utils.fromWei(balance);
  } catch (error) {
    return '';
  }
};

export const onName = async (): Promise<string> => {
  try {
    const web3 = new Web3(Web3.givenProvider);
    const surveyContract = new web3.eth.Contract(surveyAbi.abi as any, SURVEY_CONTRACT_ADDRESS);

    const name = await surveyContract.methods.name().call();

    return name;
  } catch (error) {
    return '';
  }
};

export const onLastSubmittal = async (account: string): Promise<Date | null> => {
  try {
    const web3 = new Web3(Web3.givenProvider);
    const surveyContract = new web3.eth.Contract(surveyAbi.abi as any, SURVEY_CONTRACT_ADDRESS);

    const lastSubmittal = await surveyContract.methods.lastSubmittal(account).call();
    const date = new Date(lastSubmittal * 1000);

    return date;
  } catch (error) {
    return null;
  }
};

export const onSubmit = async (account: string, surveyId: number, answerIds: number[]): Promise<boolean> => {
  try {
    const web3 = new Web3(Web3.givenProvider);
    const surveyContract = new web3.eth.Contract(surveyAbi.abi as any, SURVEY_CONTRACT_ADDRESS);

    await surveyContract.methods.submit(surveyId, answerIds).send({ from: account });

    return true;
  } catch (error) {
    return false;
  }
};

export const onCooldown = async (): Promise<string> => {
  try {
    const web3 = new Web3(Web3.givenProvider);
    const surveyContract = new web3.eth.Contract(surveyAbi.abi as any, SURVEY_CONTRACT_ADDRESS);

    const cooldown = await surveyContract.methods.cooldownSeconds().call();

    return cooldown;
  } catch (error) {
    return '';
  }
};
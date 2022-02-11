const CONTRACT_ADDRESS = "0x4c8dCB74947F49ACa18f917Da0e2f6903fA4a6ED";

import Head from "next/head";
import { FormEvent, useEffect, useState } from "react";
import Web3 from "web3";

function Header(props: { walletConnected: boolean, connectWallet: () => void }) {
  return (
    <header className="items-center w-full pl-10 pr-10 sm:pl-16 sm:pr-16 md:pl-20 md:pr-20 lg:pl-24 lg:pr-24 xl:pl-28 xl:pr-28 pt-10 pb-8 flex justify-between">
      <div className="items-center flex">
        <img src="/images/logo.png" className="w-8 h-8 cursor-pointer" onClick={() => window.location.href = "/"} />
        <h2 className="font-bold text-lg ml-5">USDCMINER</h2>
      </div>
      <a onClick={props.walletConnected ? () => window.location.href = "#dashboard" : () => props.connectWallet()} className="hidden sm:block cursor-pointer hover:scale-105 transition-all font-semibold text-sm p-2.5 pl-6 pr-6 border border-gray-300 rounded-md">{props.walletConnected ? "Goto Dashboard" : "Connect Wallet"}</a>
    </header>
  )
}

function Hero(props: { walletConnected: boolean, connectWallet: () => void }) {
  return (
    <div className="mt-16 ml-10 mr-10 sm:ml-16 sm:mr-16 md:ml-20 md:mr-20 lg:ml-24 lg:mr-24 xl:ml-28 xl:mr-28 flex flex-col-reverse lg:flex-row">
      <div className="w-full lg:w-1/2 pr-8 mt-16 lg:mt-0">
        <h3 className="mb-2.5 tracking-wider font-light">SAFEST MINING GAME ON FANTOM</h3>
        <h1 className="font-bold text-5xl sm:text-6xl">Start Earning More <span className="text-blue-500">USDC</span></h1>
        <p className="mt-10 leading-7">
          You can earn extra money on your USDC by purchasing our miners. Our miners will give you a 1% ROI, which can be compounded to generate even higher returns. USDCMINER is the safest mining game on Fantom. Connect your wallet and start earning now!
        </p>
        <button onClick={props.walletConnected ? () => window.location.href = "#dashboard" : () => props.connectWallet()} className="mt-16 w-fit transition-all hover:scale-105 pl-6 pr-6 rounded-lg bg-blue-500 text-white font-bold p-4">{props.walletConnected ? "Goto Dashboard" : "Connect Wallet"}</button>
      </div>
      <img src="/images/hero.svg" className="w-full lg:w-1/2" />
    </div>
  )
}

function LinkCard(props: { name: string, description: string, img: string, path: string }) {
  return (
    <div onClick={() => window.location.href = props.path} className="text-center mr-6 ml-6 cursor-pointer hover:scale-105 transition-all flex flex-col items-center mb-12">
      <img src={props.img} className="stroke-white w-20 mb-6" />
      <h2 className="text-xl font-bold mb-2">{props.name}</h2>
      <p>{props.description}</p>
    </div>
  )
}

function LinkCards() {
  const linkCards = [
    { img: "/images/documentation.svg", name: "Documentation", description: "View our official gitbook documentation.", path: "https://usdcminer.gitbook.io/docs/" },
    { img: "/images/discord.svg", name: "Discord", description: "Join our official discord server.", path: "https://discord.gg/rWXgJFJtDR" },
    { img: "/images/scan.svg", name: "FTMScan", description: "View our Fantom blockchain entry.", path: "https://ftmscan.com/address/0x4c8dCB74947F49ACa18f917Da0e2f6903fA4a6ED" }
  ];
  return (
    <div className="flex-wrap items-center text-white mt-28 w-full p-20 pb-8 pl-0 pr-0 bg-gradient-to-r from-blue-500 to-blue-600 flex justify-evenly">
      {
        linkCards.map((card, iter) => <LinkCard key={iter} {...card} />)
      }
    </div>
  )
}

function DashboardLeft(props: { minersCount: number, deposit: (usdcAmount: number, refferalAddress: string) => void }) {
  let [usdcAmount, setUsdcAmount] = useState("");
  let [refferalLink, setReferralLink] = useState("");
  const formSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (usdcAmount == "") return;
    props.deposit(parseInt(usdcAmount), refferalLink);
  };
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setReferralLink(params.has("referral") ? window.location.href : "");
  }, []);
  return (
    <div className="md:w-1/2">
      <h3 className="font-bold text-2xl mb-8">Your Miners</h3>
      <p>You have <span className="font-semibold">{props.minersCount}</span> miners</p>
      <form className="mt-8 flex flex-col" onSubmit={formSubmit}>
        <label htmlFor="amount" className="text-sm mb-2.5">Enter USDC amount</label>
        <div className="flex items-center">
          <input value={usdcAmount} onChange={(e) => setUsdcAmount(e.target.value)} className="text-sm flex-grow p-3 rounded-md border border-gray-300" name="amount" type="number" placeholder="USDC amount..." />
          <p className="ml-4 font-semibold">USDC</p>
        </div>
        <label htmlFor="refferal" className="text-sm mb-2.5 mt-6">Referral address (if any)</label>
        <input value={refferalLink} onChange={(e) => setReferralLink(e.target.value)} className="text-sm flex-grow p-3 rounded-md border border-gray-300" name="refferal" type="text" placeholder="Refferral link..." />
        <button className={(usdcAmount == "" ? "bg-gray-400 opacity-90 " : "hover:scale-105 bg-blue-500 ") + " pl-12 pr-12 max-w-none md:max-w-xs transition-all mt-8 self-start p-3 bg-blue-500 text-white font-bold text-sm rounded-md"}>Buy Miners</button>
      </form>
    </div>
  )
}

function Timer(props: { time: number, completed: () => void }) {
  const day_in_seconds = 60 * 60 * 24;
  const [time, setTime] = useState(day_in_seconds - (Math.round(Date.now() / 1000) - props.time));
  const complete = () => {
    props.completed();
    return 0;
  };
  useEffect(() => {
    if (time <= 0) {
      complete();
      return;
    }
    const interval = setInterval(() => setTime(prev => (prev <= 0 ? complete() : prev - 1)), 1000);
    return () => clearInterval(interval);
  }, [props.time]);
  return (
    <div className="text-center rounded-md mt-12 p-5 bg-red-400 text-white">
      <p className="text-sm">Please wait before withdrawing/compounding again.</p>
      <p className="font-semibold mt-5">{String(Math.floor(time / 3600)).padStart(2, "0")} : {String(Math.floor((time % 3600) / 60)).padStart(2, "0")} : {String((time % 3600) % 60).padStart(2, "0")}</p>
    </div>
  )
}

function DashboardRight(props: { timestamp: number, minersCount: number, walletUSDC: number, compound: () => void, withdraw: () => void }) {
  const [countdown, setCountdown] = useState(true);
  useEffect(() => {
    if ((60 * 60 * 24) - (Math.round(Date.now() / 1000) - props.timestamp) > 0) {
      setCountdown(true);
    }
  }, [props.timestamp]);
  return (
    <div className="md:w-1/2">
      <h3 className="font-bold text-2xl mb-8">Your USDC</h3>
      <p>You have <span className="font-semibold">{!countdown ? (props.minersCount / 100) : 0} USDC</span> in your barrel</p>
      <p className="mt-1">You have <span className="font-semibold">{props.walletUSDC / 10**6} USDC</span> in your wallet</p>
      {
        countdown ?
          <Timer time={props.timestamp} completed={() => setCountdown(false)} />
          :
          <div className="w-56 flex flex-col mt-8 max-w-none md:max-w-xs">
            <button onClick={props.compound} className="w-full hover:scale-105 transition-all mt-4 self-start p-3 pl-0 pr-0 bg-blue-500 text-white font-bold text-sm rounded-md">Compound USDC</button>
            <button onClick={props.withdraw} className="w-full hover:scale-105 transition-all mt-4 self-start p-3 pl-0 pr-0 bg-blue-500 text-white font-bold text-sm rounded-md">Withdraw USDC</button>
          </div>
      }
    </div>
  )
}

const abi = require("../lib/abi.json");
const usdt_abi = require("../lib/usdt_abi.json");

function Dashboard(props: { address: string }) {
  let [contractBalance, setContractBalance] = useState(0);
  let [minersCount, setMinersCount] = useState(0);
  let [walletUSDC, setWalletUSDC] = useState(0);
  let [timestamp, setTimestamp] = useState(0);
  let [ongoing, setOngoing] = useState(false);

  const contract = new window.web3.eth.Contract(abi, CONTRACT_ADDRESS);

  const updateContractBalance = () => {
    contract.methods.getContractBalance().call({ from: props.address }, (_error: any, result: any) => {
      setContractBalance(result);
    });
  };

  const updateMinersCount = () => {
    contract.methods.getMinerCount().call({ from: props.address }, (_error: any, result: any) => {
      setMinersCount(result);
    });
  };

  const updateWalletUSDC = () => {
    contract.methods.getUsdcAmount(props.address).call({ from: props.address }, (_error: any, result: any) => {
      setWalletUSDC(result);
    });
  };

  const updateTimestamp = () => {
    contract.methods.getWithdrawTime(props.address).call({ from: props.address }, (_error: any, result: any) => {
      setTimestamp(result);
    });
  };

  const deposit = (usdcAmount: number, referralAddress: string) => {
    if (ongoing) return;
    setOngoing(true);
    contract.methods.getUsdcTokenAddress().call({ from: props.address }, (_error: any, result: any) => {
      const usdt_contract = new window.web3.eth.Contract(usdt_abi, result);
      usdt_contract.methods.approve(CONTRACT_ADDRESS, String(usdcAmount * 10**6)).send({ from: props.address }).then((_receipt: any) => {
        contract.methods.deposit(String(usdcAmount * 10**6), referralAddress != "", referralAddress != "" ? referralAddress.split("=")[1] : props.address).send({ from: props.address }).then((_receipt: any) => {
          updateMinersCount();
          updateContractBalance();
          updateWalletUSDC();
          setOngoing(false);
        }).catch((_error: any) => { setOngoing(false); })
      });
    });
  }

  const withdraw = () => {
    if (ongoing) return;
    setOngoing(true);
    contract.methods.withdraw().send({ from: props.address }).then((_receipt: any) => {
      updateContractBalance();
      updateTimestamp();
      setOngoing(false);
    }).catch((_error: any) => { setOngoing(false); })
  }

  const compound = () => {
    if (ongoing) return;
    setOngoing(true);
    contract.methods.withdraw().send({ from: props.address }).then((_receipt: any) => {
      updateMinersCount();
      updateTimestamp();
      setOngoing(false);
    }).catch((_error: any) => { setOngoing(false); })
  }

  useEffect(() => {
    updateMinersCount();
    updateTimestamp();
    updateWalletUSDC();
    updateContractBalance();
  }, [props.address]);

  return (
    <div className="m-24 mb-0 ml-10 mr-10 sm:ml-16 sm:mr-16 md:ml-20 md:mr-20 lg:ml-24 lg:mr-24 xl:ml-28 xl:mr-28" id="dashboard">
      <h2 className="font-bold text-4xl">Dashboard</h2>
      <p className="mt-6">Contract balance: <span className="font-semibold">{contractBalance / 10**6} USDC</span></p>
      <p className="mt-1">Your referral address: <span className="font-semibold">https://usdcminer.com/?referral={props.address}</span></p>
      <div className="mt-12 flex flex-col md:flex-row">
        <DashboardLeft minersCount={minersCount} deposit={deposit} />
        <div className="border border-gray-300 ml-0 mr-0 md:mr-12 md:ml-12 lg:ml-20 lg:mr-20 mt-10 mb-10 md:mt-0 md:mb-0"></div>
        <DashboardRight timestamp={timestamp} minersCount={minersCount} walletUSDC={walletUSDC} withdraw={withdraw} compound={compound} />
      </div>
    </div>
  )
}

function UnconnectedDashboard(props: { connectWallet: () => void }) {
  return (
    <div className="m-24 mb-0 ml-10 mr-10 sm:ml-16 sm:mr-16 md:ml-20 md:mr-20 lg:ml-24 lg:mr-24 xl:ml-28 xl:mr-28">
      <h2 className="font-bold text-4xl">Dashboard</h2>
      <div className="mt-12 p-10 border border-gray-300 rounded-md">
        <p>Oh no! Looks like there isn&apos;t a wallet connected right now. In order to use USDCMINER, a USDC wallet needs to be connected. Please click the button below in order to connect your wallet and start using our dashboard!</p>
        <button onClick={() => props.connectWallet()} className="transition-all hover:scale-105 pl-8 pr-8 rounded-lg bg-blue-500 text-white font-bold p-3 mt-10 text-sm">Connect Wallet</button>
      </div>
    </div>
  )
}

function FooterLink(props: { title: string, items: { [name: string]: string; } }) {
  return (
    <div className="mb-6">
      <h3 className="font-bold">{props.title}</h3>
      <div className="mt-3 flex flex-col mr-20">
        {
          Object.keys(props.items).map((item, iter) => <a key={iter} href={props.items[item]} className="text-xs mb-1 transition-all hover:font-bold">{item}</a>)
        }
      </div>
    </div>
  )
}

function FooterLinks() {
  const links: { [category: string]: any } = {
    "Resources": {
      "About": "https://usdcminer.gitbook.io/docs/",
      "FTMScan": "https://ftmscan.com/address/0x4c8dCB74947F49ACa18f917Da0e2f6903fA4a6ED",
      "Dashboard": "#dashboard"
    },
    "Contact": {
      "Discord": "https://discord.gg/rWXgJFJtDR",
      "Email": "mailto:stormsoares@usdcminer.com"
    },
    "Legal": {
      "Privacy Policy": "/privacypolicy",
      "Terms of Service": "/termsofservice"
    }
  }
  return (
    <div className="ml-16 lg:ml-20 xl:ml-24 flex flex-grow flex-wrap">
      {
        Object.keys(links).map((link, iter) => <FooterLink key={iter} title={link} items={links[link]} />)
      }
    </div>
  )
}

function Footer(props: { walletConnected: boolean, connectWallet: () => void }) {
  return (
    <footer className="bg-gradient-to-r from-blue-500 to-blue-600 text-white mt-28 pl-10 pr-10 sm:pl-16 sm:pr-16 md:pl-20 md:pr-20 lg:pl-24 lg:pr-24 xl:pl-28 xl:pr-28 pt-10 pb-8 flex">
      <header>
        <div className="flex items-center">
          <h3 className="font-bold">USDCMINER</h3>
        </div>
        <p className="mt-2 text-xs tracking-wider font-light">SAFEST MINING GAME ON PHANTOM</p>
        <p className="text-sm mt-12">Copyright © 2022 USDCMINER</p>
      </header>
      <FooterLinks />
      <a onClick={props.walletConnected ? () => window.location.href = "#dashboard" : () => props.connectWallet()} className="hidden md:block text-center h-fit cursor-pointer hover:scale-105 transition-all font-semibold text-sm p-2.5 pl-6 pr-6 border border-gray-300 rounded-md">{props.walletConnected ? "Goto Dashboard" : "Connect Wallet"}</a>
    </footer>
  )
}

declare const window: any;

export default function Home() {
  let [walletConnect, setWalletConnect] = useState(false);
  let [address, setAddress] = useState("");

  const connectWallet = async () => {
    if (window.ethereum) {
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      try {
        await window.ethereum.request({ method: 'wallet_switchEthereumChain', params: [{ chainId: "0xfa" }] });
      } catch (e: any) {
        if (e.code == 4902) {
          await window.ethereum.request({
            method: 'wallet_addEthereumChain', params: [{
              chainId: "0xfa",
              chainName: "Fantom Opera",
              nativeCurrency: {
                name: "FTM",
                symbol: "FTM",
                decimals: 18
              },
              blockExplorerUrls: ["https://ftmscan.com/"],
              rpcUrls: ["https://rpc.ftm.tools/"]
            }]
          });
        }
      }

      window.web3 = new Web3(window.ethereum);
      setAddress((await window.web3.eth.getAccounts())[0]);
      setWalletConnect(true);
    }
  }

  const initialWalletConnect = async () => {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      if ((await window.web3.eth.getAccounts()).length > 0) {
        setAddress((await window.web3.eth.getAccounts())[0]);
        setWalletConnect(true);
      }
    }
  }

  useEffect(() => { initialWalletConnect() }, []);

  return (
    <div>
      <Head>
        <title>USDCMINER</title>
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <meta name="title" content="USDC Miner - Earn More USDC" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="You can earn extra money on your USDC by purchasing our miners. Our miners will give you a 1% ROI daily, which can be compounded to generate even higher returns. USDCMINER is the safest mining game on Fantom. Connect your wallet and start earning now!" />

        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://usdcminer.vercel.app" />
        <meta property="og:title" content="USDC Miner - Earn More USDC" />
        <meta property="og:description" content="You can earn extra money on your USDC by purchasing our miners. Our miners will give you a 1% ROI, which can be compounded to generate even higher returns. USDCMINER is the safest mining game on Fantom. Connect your wallet and start earning now!" />
        <meta property="og:image" content="/images/screenshot.png" />

        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://usdcminer.vercel.app" />
        <meta property="twitter:title" content="USDC Miner - Earn More USDC" />
        <meta property="twitter:description" content="You can earn extra money on your USDC by purchasing our miners. Our miners will give you a 1% ROI, which can be compounded to generate even higher returns. USDCMINER is the safest mining game on Fantom. Connect your wallet and start earning now!" />
        <meta property="twitter:image" content="/images/screenshot.png" />

        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin={"anonymous"} />
        <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;600;700&display=swap" rel="stylesheet" />
      </Head>
      <div>
        <Header walletConnected={walletConnect} connectWallet={() => connectWallet()} />
        <main>
          <Hero walletConnected={walletConnect} connectWallet={() => connectWallet()} />
          <LinkCards />
          {
            walletConnect ? <Dashboard address={address} /> : <UnconnectedDashboard connectWallet={() => connectWallet()} />
          }
        </main>
        <Footer walletConnected={walletConnect} connectWallet={() => connectWallet()} />
      </div>
    </div>
  )
}
import { useState } from "react";
import styles from "../styles/Home.module.css";
import { useSigner, useAccount } from "wagmi";

export default function Home() {
	const [sigData, setSigData] = useState([]);
	const { data: signer } = useSigner();
	const account = useAccount();

let signatureData = [];

const addresses = [
  "0x196Ff55Af7Ca5df332faf3A72972dDf6d5e109A4",
  "0xD0CE7E521d26CAc35a7B10d31d6CCc7ffFF8B15e",
  "0x7C5D8BC73041B16d6Fac2E3F2a8dE2F6397eC839",
  "0xabd43DAA71c365420f7c03ab90140CA5cC70b719",
  "0x61611Be3dB30D0E960918aC4761d744a8D568647",
  "0x1805c49AE4392F1DF411F665fDB5c6bD77b23D4a",
  "0x9C480Cd02d8a2aE18De1C6ac96C8FA41C396b146",
  "0xEE2C99D8D6ACB7940609fD6a9c5Ba2129fa43004",
  "0xC4c282C70faABF0043FA2f7548DaCf676cfAb0CC",
];

	const domain = {
		name: "Deviants Silver Pass",
		version: "1",
		chainId: 80001,
		verifyingContract: "0x5966ad8d46B416811b10b836832D789113F08ee6",
	};

	const types = {
		NFT: [
			{
				name: "account",
				type: "address",
			},
		],
	};

	async function handleSignature(e) {
		e.stopPropagation();
		e.preventDefault();
		if(account.address != addresses[2]) {return;}
	
		for (let x = 0; x < addresses.length; x++) {
			let msgParams = {
				account: addresses[x],
			};
	
			try {
				const sign = await signer._signTypedData(domain, types, msgParams);
				//push the signature data to the array
				signatureData.push({ account: addresses[x], signature: sign });
	
				console.log("signatureData: ", signatureData)
			} catch (err) {
				console.log(err);
			}
		}
	
		setSigData(signatureData);
	
		// Use fetch to send a POST request to the Next.js API
		try {
			const response = await fetch("/api/data", {
				method: "POST",
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify(signatureData),
			});
			const json = await response.json();
			console.log("API response: ", json);
		} catch (err) {
			console.log("Error writing signature data to JSON file: ", err);
		}
	}


	return (
		<div>
			{/* <ConnectButton/> */}
			<div className="text center">
					<header className="">

					</header>
				</div>

			<main className={styles.main}>
				<div className="text-center mt-5 justify-between">
				<h1 className="text-3xl text-center text-yellow-400 font-medium ">
							🔥 Signature Generator 🔥
						</h1>
					<button
						className="w-24 h-14 mb-4 ml-5 rounded-2xl p-3 bg-gradient-to-t from-red-400 to-red-700 items-center justify-center focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-inset focus:ring-red-500 focus:ring-offset-red-300"
						onClick={(e) => handleSignature(e)}
					>
						{" "}
						sign{" "}
					</button>
				</div>


			</main>
		</div>
	);
}

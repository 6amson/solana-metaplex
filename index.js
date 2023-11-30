import { createUmi } from '@metaplex-foundation/umi-bundle-defaults';
import { publicKey as publicKeySerializer, string } from '@metaplex-foundation/umi/serializers';
import { generateSigner, assertPublicKey, isPda, isPublicKey, publicKey, publicKeyBytes, isSigner } from '@metaplex-foundation/umi'
import { mplBubblegum, transfer, fetchMerkleTree, getAssetWithProof, createTree } from '@metaplex-foundation/mpl-bubblegum'
import { PublicKey } from '@solana/web3.js';

const umi = createUmi('https://api.mainnet-beta.solana.com');
const pubkey = 'ESwdeFc1zDdDvBAtU6opK2k12Q4X4FtnwMsbTf4AnRyN';
const url = 'https://mainnet.helius-rpc.com/?api-key=9548d984-121d-4dfe-af51-f6c4e633d344';
const assetId = "FJCs96hzcDH7sVNM4jC3q97hejSmMTAJEV9ctxqV765x";
const creator_id = '92HUPk51xeheShRtCwbfmAWK1L4nmz4Z6uwLJYKgj4UJ';


const merkleTree = generateSigner(umi)


const getBalance = async () => {
    const result = await umi.rpc.getBalance(pubkey);
    console.log(result);
}


const getAssetProof = async () => {
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            jsonrpc: '2.0',
            id: 'my-id',
            method: 'getAssetProof',
            params: {
                id: 'Bu1DEKeawy7txbnCEJE4BU3BKLXaNAKCYcHR4XhndGss'
            },
        }),
    });
    const { result } = await response.json();
    console.log("Assets Proof: ", result);
};

const transferAssets = async () => {
    const assetWithProof = getAssetProof();

    let currentLeafOwner; //to be replaced with the address of owner of cNFT
    let newLeafOwner;     //to be replaced with the address of new owner of cNFT

    //to simulate soulboundNFT, we'd check if the current leafOwner is the newLeafOwner
    if (leafOwner == newLeaftOwner) {
        await transfer(umi, {
            ...assetWithProof,
            leafOwner: currentLeafOwner,
            newLeafOwner: newLeafOwner.publicKey,
        }).sendAndConfirm(umi)
    }else{
        throw Error('NfTs cant be transfferred');
    }
}

const getSeed = async () => {
    const seeds = publicKeyBytes(pubkey);
    console.log(seeds);
}

const getPDA = async () => {
    const tokenMetadataProgramId = publicKey(pubkey);
    const metadata = umi.eddsa.findPda(tokenMetadataProgramId, [
        string({ size: 'variable' }).serialize('metadata'),
        publicKeySerializer().serialize(tokenMetadataProgramId),
        publicKeySerializer().serialize(pubkey),
    ]);
    console.log(metadata);
}

getAssetProof();
// transferAssets();

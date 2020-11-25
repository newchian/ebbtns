package com.blockchain.block;

import java.util.ArrayList;
import java.util.List;

import org.junit.Test;

import com.alibaba.fastjson.JSON;
import com.blockchain.model.Block;
import com.blockchain.model.Transaction;
import com.blockchain.security.CryptoUtil;

public class BlockServiceTest {
	@Test
	public void testBlockMine() throws Exception {
		// 创建一个空的区块链
		List<Block> blockchain = new ArrayList<>();
		// 生成创世区块
		Block block = new Block(1, System.currentTimeMillis(), new ArrayList<Transaction>(), 1, "1", "1");
		// 加入创世区块到区块链里
		blockchain.add(block);
		System.out.println(JSON.toJSONString(blockchain));
		//创建一个空的交易结合
		List<Transaction> txs = new ArrayList<>();
		Transaction tx1 = new Transaction();
		Transaction tx2 = new Transaction();
		Transaction tx3 = new Transaction();
		txs.add(tx1);
		txs.add(tx2);
		txs.add(tx3);
		//加入系统奖励的交易
		Transaction sysTx = new Transaction();
		txs.add(sysTx);
		//获取当前区块链里的最后一个区块
		Block latestBlock = blockchain.get(blockchain.size() - 1);
		int nonce = 1;
		String hash = CryptoUtil.SHA256(latestBlock.getHash() + JSON.toJSONString(txs) + nonce);
		System.out.println("hash:" + hash);
	}
}


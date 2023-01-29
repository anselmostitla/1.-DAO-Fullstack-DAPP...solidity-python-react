from brownie import DominionDAO, accounts, config

def deploy_dao():
  DominionDAO.deploy({"from": accounts.add(config["wallets"]["from_key"][0])})
  # DominionDAO.deploy({"from":accounts[0]})
  

def main():
  deploy_dao()
  
  # D:\Solidity\demos\DAO\client\src\contracts\scripts\deploy.py
  # S D:\Solidity\demos\DAO\client\src\contracts>
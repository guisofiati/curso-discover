from typing import Dict
from src.main.drivers.barcode_handler import BarcodeHandler

class TagCreatorController:
  def create(self, product_code: str) -> Dict:
    path_from_tag = self.__create_tag(product_code)
    return self.__format_response(path_from_tag)

  def __create_tag(self, product_code: str) -> str: # private method
    barcode_handler = BarcodeHandler()
    path_from_tag = barcode_handler.create_barcode(product_code)
    return path_from_tag
  
  def __format_response(self, path_from_tag: str) -> Dict:
    return {
      "data": {
        "type": "Tag image",
        "count": 1,
        "path": f'{path_from_tag}.png'
      }
    }
using AutoMapper;
using Backend.DatabaseModels;
using Backend.Dtos;
using Backend.Enums;
using Backend.Models;
using Backend.Providers;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web.Http;

namespace Backend.Controllers
{
    public class ProductController : ApiController
    {
        private DatabaseContext databaseContext;
        private ITranslationProvider translationProvider;

        public ProductController()
        {
            databaseContext = new DatabaseContext();
            translationProvider = new TranslationProvider();
        }

        // GET api/<controller>
        [Authorize(Roles = "User")]
        public BaseResponseWithItem<IEnumerable<ProductDto>> Get()
        {
            var products = databaseContext.Products.ToList();
            var productsDto = Mapper.Map<IEnumerable<ProductDto>>(products);
            return BaseResponseWithItem<IEnumerable<ProductDto>>.CreateOkResponse(productsDto, translationProvider);
        }

        // GET api/<controller>/5
        [Authorize(Roles = "User")]
        public BaseResponseWithItem<ProductDto> Get(int id)
        {
            var product = databaseContext.Products.FirstOrDefault(cat => cat.Id == id);
            if (product != null)
            {
                return BaseResponseWithItem<ProductDto>.CreateOkResponse(Mapper.Map<ProductDto>(product), translationProvider);
            }
            return BaseResponseWithItem<ProductDto>.CreateNotFoundResponse(id, translationProvider);
        }

        // POST api/<controller>
        [Authorize(Roles = "Administrator")]
        public BaseResponse Post([FromBody]ProductDto productDto)
        {
            var validateResponse = ValidateProductDto(productDto);
            if (!validateResponse.Success)
            {
                return validateResponse;
            }

            Product product = Mapper.Map<Product>(productDto);
            databaseContext.Products.Add(product);
            databaseContext.SaveChanges();
            return BaseResponse.CreateOkResponse(translationProvider);
        }

        [Authorize(Roles = "Administrator")]
        public BaseResponse Put([FromBody]ProductDto productDto)
        {
            Product productEntity = databaseContext.Products.Where(prod => prod.Id == productDto.Id).FirstOrDefault();
            if (productEntity == null)
            {
                return BaseResponse.CreateNotFoundResponse(productDto.Id, translationProvider);
            }
            var validateResponse = ValidateProductDto(productDto);
            if (!validateResponse.Success)
            {
                return validateResponse;
            }

            databaseContext.Entry(productEntity).State = EntityState.Modified;
            databaseContext.Entry(productEntity).CurrentValues.SetValues(productDto);
            databaseContext.SaveChanges();
            return BaseResponse.CreateOkResponse(translationProvider);
        }

        // DELETE api/<controller>/5
        [Authorize(Roles = "Administrator")]
        public BaseResponse Delete(long id)
        {
            var product = databaseContext.Products.FirstOrDefault(c => c.Id == id);
            if (product == null)
            {
                return BaseResponse.CreateNotFoundResponse(id, translationProvider);
            }
            databaseContext.Products.Remove(product);
            databaseContext.SaveChanges();
            return BaseResponse.CreateOkResponse(translationProvider);
        }

        private BaseResponse ValidateProductDto(ProductDto productDto)
        {
            BaseResponse baseResponse = new BaseResponse();
            baseResponse.Success = true;

            if (string.IsNullOrEmpty(productDto.Name))
            {
                baseResponse.Success = false;
                baseResponse.Message = translationProvider.GetTranslation(Translations.NameIsRequired).Text;
                return baseResponse;
            }

            if (productDto.Price <= 0)
            {
                baseResponse.Success = false;
                baseResponse.Message = translationProvider.GetTranslation(Translations.PriceMustBeBiggerThanZero).Text;
                return baseResponse;
            }

            return baseResponse;
        }
    }
}
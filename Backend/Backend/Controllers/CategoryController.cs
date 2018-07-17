using AutoMapper;
using Backend.DatabaseModels;
using Backend.Dtos;
using Backend.Models;
using Backend.Providers;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;

namespace Backend.Controllers
{
    public class CategoryController : ApiController
    {
        private DatabaseContext databaseContext;
        private ITranslationProvider translationProvider;

        public CategoryController()
        {
            databaseContext = new DatabaseContext();
            translationProvider = new TranslationProvider();
        }

        // GET api/<controller>
        [Authorize(Roles = "User")]
        public BaseResponseWithItem<IEnumerable<CategoryDto>> Get()
        {
            var categories = databaseContext.Categories.ToList();
            var categoriesDto = Mapper.Map<IEnumerable<CategoryDto>>(categories);
            return BaseResponseWithItem<IEnumerable<CategoryDto>>.CreateOkResponse(categoriesDto, translationProvider);
        }

        // GET api/<controller>/5
        [Authorize(Roles = "User")]
        public BaseResponseWithItem<CategoryDto> Get(int id)
        {
            var category = databaseContext.Categories.FirstOrDefault(cat => cat.Id == id);
            if(category != null)
            {
                return BaseResponseWithItem<CategoryDto>.CreateOkResponse(Mapper.Map<CategoryDto>(category), translationProvider);
            }
            return BaseResponseWithItem<CategoryDto>.CreateNotFoundResponse(id, translationProvider);
        }

        // POST api/<controller>
        [Authorize(Roles = "Administrator")]
        public BaseResponse Post([FromBody]CategoryDto categoryDto)
        {
            Category category = Mapper.Map<Category>(categoryDto);
            databaseContext.Categories.Add(category);
            databaseContext.SaveChanges();
            return BaseResponse.CreateOkResponse(translationProvider);
        }

        // PUT api/<controller>/5
        [Authorize(Roles = "Administrator")]
        public BaseResponse Put(int id, [FromBody]string name)
        {
            Category category = new Category();
            category.Name = name;

            databaseContext.Categories.Add(category);
            databaseContext.SaveChanges();
            return BaseResponse.CreateOkResponse(translationProvider);
        }

        // DELETE api/<controller>/5
        [Authorize(Roles = "Administrator")]
        public BaseResponse Delete(int id)
        {
            var category = databaseContext.Categories.FirstOrDefault(c => c.Id == id);
            if(category == null)
            {
                return BaseResponse.CreateNotFoundResponse(id, translationProvider);
            }
            databaseContext.Categories.Remove(category);
            databaseContext.SaveChanges();
            return BaseResponse.CreateOkResponse(translationProvider);
        }
    }
}
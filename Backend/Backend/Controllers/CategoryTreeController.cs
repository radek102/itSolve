using AutoMapper;
using Backend.DatabaseModels;
using Backend.Dtos;
using Backend.Models;
using Backend.Providers;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web.Http;

namespace Backend.Controllers
{

    public class CategoryTreeController : ApiController
    {
        private DatabaseContext databaseContext;
        private ITranslationProvider translationProvider;

        public CategoryTreeController()
        {
            databaseContext = new DatabaseContext();
            translationProvider = new TranslationProvider();
        }

        // GET api/<controller>
        [Authorize(Roles = "User")]
        public BaseResponseWithItem<IEnumerable<CategoryNodeDto>> Get()
        {
            var categories = databaseContext.Categories.Where(category => category.ParentId == null).ToList();
            var categoriesDto = Mapper.Map<IEnumerable<CategoryNodeDto>>(categories);
            return BaseResponseWithItem<IEnumerable<CategoryNodeDto>>.CreateOkResponse(categoriesDto, translationProvider);
        }

        [Authorize(Roles = "Administrator")]
        public BaseResponse Post([FromBody]IEnumerable<CategoryNodeDto> categoriesDto)
        {
            foreach(CategoryNodeDto categoryDto in categoriesDto)
            {
                SaveChangesInCategoryTree(categoryDto);
            }
            databaseContext.SaveChanges();
            return BaseResponse.CreateOkResponse(translationProvider);
        }

        private BaseResponse SaveChangesInCategoryTree(CategoryNodeDto categoryDto)
        {
            Category category = Mapper.Map<Category>(categoryDto);
            Category categoryEntity = databaseContext.Categories.Where(cat => cat.Id == category.Id).FirstOrDefault();
            if (categoryEntity == null)
            {
                return BaseResponse.CreateNotFoundResponse(categoryDto.Id, translationProvider);
            }
            foreach (CategoryNodeDto child in categoryDto.Children)
            {
                SaveChangesInCategoryTree(child);
            }
            databaseContext.Entry(categoryEntity).State = EntityState.Modified;
            databaseContext.Entry(categoryEntity).CurrentValues.SetValues(categoryDto);
            return BaseResponse.CreateOkResponse(translationProvider);
        }
    }
}
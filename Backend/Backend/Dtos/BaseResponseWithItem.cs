using Backend.Enums;
using Backend.Providers;

namespace Backend.Dtos
{
    public class BaseResponseWithItem<T> : BaseResponse
    {
        public T Item;

        public static BaseResponseWithItem<T> CreateOkResponse(T item, ITranslationProvider translationProvider)
        {
            BaseResponseWithItem<T> response = new BaseResponseWithItem<T>();
            response.Success = true;
            response.Message = translationProvider.GetTranslation(Translations.EverythingOk).Text;
            response.Item = item;
            return response;
        }
        
        public static new BaseResponseWithItem<T> CreateNotFoundResponse(long id, ITranslationProvider translationProvider)
        {
            BaseResponse baseResponse = BaseResponse.CreateNotFoundResponse(id, translationProvider);
            return new BaseResponseWithItem<T>
            {
                Message = baseResponse.Message,
                Success = baseResponse.Success
            };
        }
    }
}
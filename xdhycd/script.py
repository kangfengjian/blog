import os
from PIL import Image
import cv2
import numpy as np
from PIL import Image, ImageEnhance
from pathlib import Path

def compress_image(input_path, output_path, target_size=(2590, 1790), quality=15):
    """
    将输入图像调整到指定大小并压缩。
    :param input_path: 输入图片路径
    :param output_path: 输出图片路径
    :param target_size: 目标图像尺寸（如 100x100）
    :param quality: 压缩质量（0-100，100 表示质量最高）
    """
    # 打开图像
    with Image.open(input_path) as img:
        # 调整图像大小
        img = img.convert('RGB')
        img = img.resize(target_size, Image.Resampling.LANCZOS)
        # 保存压缩后的图像（JPEG 格式可以指定质量）
        img.save(output_path, format='JPEG', quality=quality)
        # print(f"图像已保存到 {output_path}，尺寸为 {target_size}，压缩质量为 {quality}")


def denoise_image(image):
    """
    使用 OpenCV 去噪，减少扫描图像中的噪点。
    :param image: 输入图像
    :return: 去噪后的图像
    """
    # 使用高斯模糊去噪
    return cv2.GaussianBlur(image, (5, 5), 0)

def sharpen_image(image):
    """
    使用锐化滤波器增强图像清晰度。
    :param image: 输入图像
    :return: 锐化后的图像
    """
    # 锐化滤波器
    kernel = np.array([[0, -1, 0], [-1, 5,-1], [0, -1, 0]])
    return cv2.filter2D(image, -1, kernel)

def enhance_contrast(image):
    """
    增强图像的对比度。
    :param image: 输入图像
    :return: 增强对比度后的图像
    """
    # 转换为PIL图像
    pil_image = Image.fromarray(image)
    
    # 使用ImageEnhance增强对比度
    enhancer = ImageEnhance.Contrast(pil_image)
    pil_image = enhancer.enhance(2)  # 2表示对比度增强倍数
    
    # 返回增强后的图像
    return np.array(pil_image)

def process_image(input_path, output_path):
    """
    处理扫描图像，使其更加清晰。
    :param input_path: 输入图像路径
    :param output_path: 输出图像路径
    """
    # 读取图像
    image = cv2.imdecode(np.fromfile(input_path,dtype=np.uint8),-1)
    #  = cv2.imread(input_path.encode('utf-8').decode('utf-8'))
    # image = cv2.imread(input_path)
    # 转为灰度图（如果需要）
    gray_image = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    # 去噪
    denoised_image = denoise_image(gray_image)
    # 锐化
    sharpened_image = sharpen_image(denoised_image)
    # 增强对比度
    final_image = enhance_contrast(sharpened_image)
    # 保存处理后的图像
    cv2.imwrite(output_path, final_image)
    # print(f"图像已保存到 {output_path}")



if __name__ == "__main__":
    for f in os.listdir('./xdhycd'):
        image_no = f.split('.')[0].split('_')[1]
        image_no_str = format(int(image_no)-2, '04d')
        print(image_no_str)
        # 输入扫描图像路径
        input_path = './xdhycd/{}'.format(f)  # 你可以替换成你自己的文件路径
        # 输出处理后的图像路径
        # output_path = 'output_sharpened_image.jpg'
        # # 调用处理函数
        # process_image(input_path, output_path)
        # # 输入图像路径
        input_path = input_path  # 你可以替换成你自己的文件路径
        # # 输出图像路径
        output_path = './images_append/{}.jpg'.format(image_no_str)
        # # 调用压缩函数
        compress_image(input_path, output_path)
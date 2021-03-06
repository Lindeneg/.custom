import setuptools

with open("README.md", "r") as fh:
    long_description = fh.read()
    fh.close()

with open("requirements.txt", "r") as mFile:
    requirements = mFile.read().split("\n")
    mFile.close()

require = [i for i in requirements if not i == ""]

setuptools.setup(
    name="",
    version="0.1",
    author="Christian Lindeneg",
    author_email="hi@lindeneg.org",
    description="",
    long_description=long_description,
    long_description_content_type="text/markdown",
    url="https://github.com/lindeneg/",
    packages=setuptools.find_packages(),
    install_requires=require,
    test_suite="tests",
    keywords='',
    entry_points ={}, 
    classifiers=[
        "Programming Language :: Python :: 3",
        "License :: OSI Approved :: MIT License",
        "Operating System :: OS Independent",
    ],
    python_requires='>=3.7',
)